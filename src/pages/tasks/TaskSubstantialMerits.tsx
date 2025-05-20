import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { infoCollApi } from '../../services/api';
import { getUserType } from '../../utils/user';
import ColorfulTextArea from '../../components/ColorfulTextArea';

interface TaskSubstantialMerits {
  id?: number;
  clientCaseId: number;
  prong1SmDraft: string;
  prong1SmOverall: string;
  prong1SmConfirm: string;
}

const TaskSubstantialMerits = forwardRef(({ clientCaseId }: { clientCaseId: number }, ref) => {
  const [formData, setFormData] = useState<TaskSubstantialMerits>({
    clientCaseId,
    prong1SmDraft: '',
    prong1SmOverall: '',
    prong1SmConfirm: ''
  });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const userType = getUserType() || 'admin';

  useEffect(() => {
    if (clientCaseId) {
      infoCollApi.getSubstantialMerits(clientCaseId).then(res => {
        if (res && res.data) {
          setFormData({
            id: res.data.id,
            clientCaseId: res.data.clientCaseId,
            prong1SmDraft: res.data.draft || '',
            prong1SmOverall: res.data.overall || '',
            prong1SmConfirm: res.data.confirm || ''
          });
        }
      }).catch(() => {
        // 可以加错误提示
      });
    }
  }, [clientCaseId]);

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorfulTextAreaChange = (value: string) => {
    setFormData(prev => ({ ...prev, prong1SmDraft: value }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleConfirm = async () => {
    try {
      const data = {
        id: formData.id,
        clientCaseId: formData.clientCaseId,
        draft: formData.prong1SmDraft,
        overall: formData.prong1SmOverall,
        confirm: 'YES'
      };
      await infoCollApi.submitSubstantialMerits(data);
      setFormData(prev => ({ ...prev, prong1SmConfirm: 'YES' }));
      setSnackbar({ open: true, message: '确认成功', severity: 'success' });
    } catch (e: any) {
      setSnackbar({ open: true, message: e?.message || '确认失败', severity: 'error' });
    }
  };

  useImperativeHandle(ref, () => ({
    getFormData: () => formData,
    submit: async (clientCase: any) => {
      try {
        const data = {
          id: formData.id,
          clientCaseId: clientCase.clientCaseId,
          draft: formData.prong1SmDraft,
          overall: formData.prong1SmOverall,
          confirm: formData.prong1SmConfirm
        };
        await infoCollApi.submitSubstantialMerits(data);
        setSnackbar({ open: true, message: '保存成功', severity: 'success' });
      } catch (e: any) {
        setSnackbar({ open: true, message: e?.message || '保存失败', severity: 'error' });
      }
    }
  }));

  return (
    <Box component="form" autoComplete="off">
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Substantial Merits</Typography>
      
      {/* Initial Draft */}
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>Initial Draft</Typography>
      <Box sx={{ mb: 2 }}>
        <ColorfulTextArea
          value={formData.prong1SmDraft || ''}
          onChange={handleColorfulTextAreaChange}
          userType={userType}
        />
      </Box>

      {/* General Feedback */}
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>General Feedback</Typography>
      <TextField
        name="prong1SmOverall"
        fullWidth
        multiline
        rows={4}
        size="small"
        sx={{ mb: 2 }}
        value={formData.prong1SmOverall || ''}
        onChange={handleTextFieldChange}
      />

      {/* Confirm & Move to Next Step */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleConfirm}
        disabled={formData.prong1SmConfirm === 'YES'}
        sx={{ mb: 3 }}
      >
        {formData.prong1SmConfirm === 'YES' ? 'Approved' : 'Approve & Continue'}
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
});

export default TaskSubstantialMerits; 