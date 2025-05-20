import React, { useState, useImperativeHandle, forwardRef, useEffect, useRef } from 'react';
import { Box, Typography, Button, Snackbar, Alert, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { infoCollApi } from '../../services/api';
import { getUserType } from '../../utils/user';
import ColorfulTextArea from '../../components/ColorfulTextArea';


const TaskNationalImportance = forwardRef(({ clientCaseId }: { clientCaseId: number }, ref) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const userType = getUserType() || 'admin';

  useEffect(() => {
    if (clientCaseId) {
      infoCollApi.getNationalImportance(clientCaseId).then(res => {
        if (res && res.data) {
          setFormData(res.data);
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
    console.log('value', value);
    setFormData(prev => ({ ...prev, prong1NiDraft: value }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleSync = async () => {
    try {
      const data = { ...formData, clientCaseId };
      await infoCollApi.submitNationalImportance(data);
      setSnackbar({ open: true, message: '同步成功', severity: 'success' });
    } catch (e: any) {
      setSnackbar({ open: true, message: e?.message || '同步失败', severity: 'error' });
    }
  };

  const handleCopy = () => {
    if (formData.prong1NiOverall) {
      navigator.clipboard.writeText(formData.prong1NiOverall || '');
    }
  };

  useImperativeHandle(ref, () => ({
    getFormData: () => formData,
    submit: async (clientCase: any) => {
      try {
        const data = { ...formData, clientCaseId: clientCase.clientCaseId };
        await infoCollApi.submitNationalImportance(data);
        setSnackbar({ open: true, message: '保存成功', severity: 'success' });
      } catch (e: any) {
        setSnackbar({ open: true, message: e?.message || '保存失败', severity: 'error' });
      }
    }
  }));

  return (
    <Box component="form" autoComplete="off">
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>National Importance</Typography>
      
      {/* Initial Draft */}
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>Initial Draft</Typography>
      <Box sx={{ mb: 2 }}>
        <ColorfulTextArea
          value={formData.prong1NiDraft || ''}
          onChange={handleColorfulTextAreaChange}
          userType={userType}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSync}
        sx={{ mb: 3 }}
      >
        Sync with Client
      </Button>

      {/* Client Feedback */}
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>Client Feedback (Overall)</Typography>
      <TextField
        name="prong1NiOverall"
        fullWidth
        multiline
        rows={4}
        size="small"
        sx={{ mb: 2 }}
        value={formData.prong1NiOverall || ''}
        onChange={handleTextFieldChange}
      />
      <Button
        variant="outlined"
        startIcon={<ContentCopyIcon />}
        onClick={handleCopy}
        sx={{ mb: 3 }}
      >
        Copy Feedback
      </Button>

      {/* Client Confirmation */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={async () => {
          try {
            const data = { ...formData, prong1NiConfirmation: 'YES' };
            await infoCollApi.submitNationalImportance(data);
            setFormData(prev => ({ ...prev, prong1NiConfirmation: 'YES' }));
            setSnackbar({ open: true, message: '确认成功', severity: 'success' });
          } catch (e: any) {
            setSnackbar({ open: true, message: e?.message || '确认失败', severity: 'error' });
          }
        }}
        disabled={formData.prong1NiConfirmation === 'YES'}
        sx={{ mb: 3 }}
      >
        {formData.prong1NiConfirmation === 'YES' ? 'Approved' : 'Approve & Continue'}
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

export default TaskNationalImportance; 