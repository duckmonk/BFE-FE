import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { infoCollApi } from '../../services/api';
import { getUserType } from '../../utils/user';
import ColorfulTextArea from '../../components/ColorfulTextArea';

interface WellPositionedData {
  id?: number;
  clientCaseId: number;
  prong2WpDraft: string;
  prong2WpOverall: string;
  prong2WpConfirm: string;
}

const TaskWellPositioned = forwardRef(({ clientCaseId }: { clientCaseId: number }, ref) => {
  const [formData, setFormData] = useState<WellPositionedData>({
    clientCaseId,
    prong2WpDraft: '',
    prong2WpOverall: '',
    prong2WpConfirm: ''
  });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const userType = getUserType() || 'admin';

  useEffect(() => {
    if (clientCaseId) {
      infoCollApi.getWellPositioned(clientCaseId).then(res => {
        if (res && res.data) {
          setFormData({
            id: res.data.id,
            clientCaseId: res.data.clientCaseId,
            prong2WpDraft: res.data.draft || '',
            prong2WpOverall: res.data.overall || '',
            prong2WpConfirm: res.data.confirm || ''
          });
        }
      }).catch(() => {
        // 可以加错误提示
      });
    }
  }, [clientCaseId]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleConfirm = async () => {
    try {
      const data = {
        id: formData.id,
        clientCaseId: formData.clientCaseId,
        draft: formData.prong2WpDraft,
        overall: formData.prong2WpOverall,
        confirm: 'YES'
      };
      await infoCollApi.submitWellPositioned(data);
      setFormData(prev => ({ ...prev, prong2WpConfirm: 'YES' }));
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
          draft: formData.prong2WpDraft,
          overall: formData.prong2WpOverall,
          confirm: formData.prong2WpConfirm
        };
        await infoCollApi.submitWellPositioned(data);
        setSnackbar({ open: true, message: '保存成功', severity: 'success' });
      } catch (e: any) {
        setSnackbar({ open: true, message: e?.message || '保存失败', severity: 'error' });
      }
    }
  }));

  return (
    <Box component="form" autoComplete="off">
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Well Positioned</Typography>
      
      {/* Initial Draft */}
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>Initial Draft</Typography>
      <Box sx={{ mb: 2 }}>
        <ColorfulTextArea
          value={formData.prong2WpDraft || ''}
          onChange={(value) => handleChange('prong2WpDraft', value)}
          userType={userType}
        />
      </Box>

      {/* General Feedback */}
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>General Feedback</Typography>
      <TextField
        name="prong2WpOverall"
        fullWidth
        multiline
        rows={4}
        size="small"
        sx={{ mb: 2 }}
        value={formData.prong2WpOverall || ''}
        onChange={(e) => handleChange('prong2WpOverall', e.target.value)}
      />

      {/* Confirm & Move to Next Step */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleConfirm}
        disabled={formData.prong2WpConfirm === 'YES'}
        sx={{ mb: 3 }}
      >
        {formData.prong2WpConfirm === 'YES' ? 'Approved' : 'Approve & Continue'}
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

export default TaskWellPositioned; 