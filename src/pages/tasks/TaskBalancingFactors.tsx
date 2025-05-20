import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { infoCollApi } from '../../services/api';
import { getUserType } from '../../utils/user';
import ColorfulTextArea from '../../components/ColorfulTextArea';

interface BalancingFactorsData {
  id?: number;
  clientCaseId: number;
  prong3BfDraft: string;
  prong3BfOverall: string;
  prong3BfConfirm: string;
}

const TaskBalancingFactors = forwardRef(({ clientCaseId }: { clientCaseId: number }, ref) => {
  const [formData, setFormData] = useState<BalancingFactorsData>({
    clientCaseId,
    prong3BfDraft: '',
    prong3BfOverall: '',
    prong3BfConfirm: ''
  });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const userType = getUserType() || 'admin';

  useEffect(() => {
    if (clientCaseId) {
      infoCollApi.getBalancingFactors(clientCaseId).then(res => {
        if (res && res.data) {
          setFormData({
            id: res.data.id,
            clientCaseId: res.data.clientCaseId,
            prong3BfDraft: res.data.draft || '',
            prong3BfOverall: res.data.overall || '',
            prong3BfConfirm: res.data.confirm || ''
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
        draft: formData.prong3BfDraft,
        overall: formData.prong3BfOverall,
        confirm: 'YES'
      };
      await infoCollApi.submitBalancingFactors(data);
      setFormData(prev => ({ ...prev, prong3BfConfirm: 'YES' }));
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
          draft: formData.prong3BfDraft,
          overall: formData.prong3BfOverall,
          confirm: formData.prong3BfConfirm
        };
        await infoCollApi.submitBalancingFactors(data);
        setSnackbar({ open: true, message: '保存成功', severity: 'success' });
      } catch (e: any) {
        setSnackbar({ open: true, message: e?.message || '保存失败', severity: 'error' });
      }
    }
  }));

  return (
    <Box component="form" autoComplete="off">
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Prong 3 - Balancing Factors</Typography>
      
      {/* Initial Draft */}
      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Initial Draft</Typography>
      <Box sx={{ mb: 2 }}>
        <ColorfulTextArea
          value={formData.prong3BfDraft}
          onChange={(value) => handleChange('prong3BfDraft', value)}
          userType={userType}
        />
      </Box>

      {/* General Feedback */}
      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>General Feedback</Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        size="small"
        sx={{ mb: 2 }}
        value={formData.prong3BfOverall}
        onChange={(e) => handleChange('prong3BfOverall', e.target.value)}
      />

      {/* Confirm Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleConfirm}
        disabled={formData.prong3BfConfirm === 'YES'}
        sx={{ mt: 2 }}
      >
        {formData.prong3BfConfirm === 'YES' ? 'Approved' : 'Approve & Continue'}
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

export default TaskBalancingFactors; 