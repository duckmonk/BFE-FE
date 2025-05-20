import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { infoCollApi } from '../../services/api';
import { getUserType } from '../../utils/user';
import ColorfulTextArea from '../../components/ColorfulTextArea';
import FileUploadButton from '../../components/FileUploadButton';

interface RecommendationLetter {
  id?: number;
  refereeId?: number;
  clientCaseId: number;
  refereeName: string;
  rlDraft: string;
  rlOverallFeedback: string;
  rlConfirm: string;
  rlSignedLetter: string;
}

const TaskRecommendationLetters = forwardRef(({ clientCaseId }: { clientCaseId: number }, ref) => {
  const [letters, setLetters] = useState<RecommendationLetter[]>([]);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const userType = getUserType() || 'admin';

  useEffect(() => {
    if (clientCaseId) {
      infoCollApi.getRecommendationLetters(clientCaseId).then(res => {
        if (res && res.data) {
          setLetters(res.data.map((letter: any) => ({
            id: letter.id,
            refereeId: letter.refereeId,
            clientCaseId: letter.clientCaseId,
            refereeName: letter.refereeName,
            rlDraft: letter.recommendationLetter || '',
            rlOverallFeedback: letter.feedback || '',
            rlConfirm: letter.confirm || '',
            rlSignedLetter: letter.signedLetter || ''
          })));
        }
      }).catch(() => {
        // 可以加错误提示
      });
    }
  }, [clientCaseId]);

  const handleLetterChange = (index: number, field: string, value: string) => {
    console.log('Letter change:', { index, field, value });
    setLetters(prev => prev.map((letter, i) => 
      i === index ? { ...letter, [field]: value } : letter
    ));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleSave = async (index: number) => {
    try {
      const letterToSave = {
        id: letters[index].id,
        refereeId: letters[index].refereeId,
        clientCaseId: letters[index].clientCaseId,
        refereeName: letters[index].refereeName,
        rlDraft: letters[index].rlDraft || '',
        rlOverallFeedback: letters[index].rlOverallFeedback || '',
        rlConfirm: letters[index].rlConfirm || '',
        rlSignedLetter: letters[index].rlSignedLetter || ''
      };
      await infoCollApi.submitRecommendationLetters(letters.map(letter => ({
        id: letter.id,
        refereeId: letter.refereeId,
        clientCaseId: letter.clientCaseId,
        refereeName: letter.refereeName,
        rlDraft: letter.rlDraft || '',
        rlOverallFeedback: letter.rlOverallFeedback || '',
        rlConfirm: letter.rlConfirm || '',
        rlSignedLetter: letter.rlSignedLetter || ''
      })));
      setSnackbar({ open: true, message: '保存成功', severity: 'success' });
    } catch (e: any) {
      setSnackbar({ open: true, message: e?.message || '保存失败', severity: 'error' });
    }
  };

  const handleConfirm = async (index: number) => {
    try {
      const updatedLetters = letters.map((letter, i) => 
        i === index ? { ...letter, rlConfirm: 'YES' } : letter
      );
      await infoCollApi.submitRecommendationLetters(updatedLetters.map(letter => ({
        id: letter.id,
        refereeId: letter.refereeId,
        clientCaseId: letter.clientCaseId,
        refereeName: letter.refereeName,
        rlDraft: letter.rlDraft || '',
        rlOverallFeedback: letter.rlOverallFeedback || '',
        rlConfirm: letter.rlConfirm || '',
        rlSignedLetter: letter.rlSignedLetter || ''
      })));
      setLetters(updatedLetters);
      setSnackbar({ open: true, message: '确认成功', severity: 'success' });
    } catch (e: any) {
      setSnackbar({ open: true, message: e?.message || '确认失败', severity: 'error' });
    }
  };

  // 检查是否所有之前的推荐信都已确认
  const canEditLetter = (index: number) => {
    return letters.slice(0, index).every(letter => letter.rlConfirm === 'YES');
  };

  useImperativeHandle(ref, () => ({
    getFormData: () => letters,
    submit: async (clientCase: any) => {
      try {
        const data = letters.map(letter => ({
          id: letter.id,
          refereeId: letter.refereeId,
          clientCaseId: clientCase.clientCaseId,
          refereeName: letter.refereeName,
          rlDraft: letter.rlDraft || '',
          rlOverallFeedback: letter.rlOverallFeedback || '',
          rlConfirm: letter.rlConfirm || '',
          rlSignedLetter: letter.rlSignedLetter || ''
        }));
        await infoCollApi.submitRecommendationLetters(data);
        setSnackbar({ open: true, message: '保存成功', severity: 'success' });
      } catch (e: any) {
        setSnackbar({ open: true, message: e?.message || '保存失败', severity: 'error' });
      }
    }
  }));

  return (
    <Box component="form" autoComplete="off">
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Recommendation Letters</Typography>
      
      {letters.map((letter, index) => (
        <Accordion 
          key={letter.refereeName} 
          sx={{ mb: 2 }}
          disabled={!canEditLetter(index)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight={600}>
              Recommendation Letter for {letter.refereeName}
              {letter.rlConfirm === 'YES' && (
                <Typography component="span" sx={{ ml: 2, color: 'success.main' }}>
                  (已确认)
                </Typography>
              )}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* Draft Recommendation Letter */}
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Draft Recommendation Letter</Typography>
            <Box sx={{ mb: 2 }}>
              <ColorfulTextArea
                value={letter.rlDraft || ''}
                onChange={(value) => handleLetterChange(index, 'rlDraft', value)}
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
              value={letter.rlOverallFeedback || ''}
              onChange={(e) => handleLetterChange(index, 'rlOverallFeedback', e.target.value)}
              disabled={!canEditLetter(index)}
            />

            {/* Upload Signed Letter */}
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Upload Signed Recommendation Letter</Typography>
            <FileUploadButton
              label="Upload PDF"
              fileType="pdf"
              onUploadSuccess={(url) => handleLetterChange(index, 'rlSignedLetter', url)}
              onUploadError={(error) => setSnackbar({ open: true, message: error, severity: 'error' })}
              onFileUrlChange={(url) => handleLetterChange(index, 'rlSignedLetter', url || '')}
              accept=".pdf"
              required
              fileUrl={letter.rlSignedLetter}
              fileName={letter.rlSignedLetter ? letter.rlSignedLetter.split('/').pop() : ''}
              disabled={!canEditLetter(index)}
            />

            {/* Save and Confirm Buttons */}
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleSave(index)}
                disabled={!canEditLetter(index)}
                sx={{ flex: 1 }}
              >
                保存
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleConfirm(index)}
                disabled={letter.rlConfirm === 'YES' || !canEditLetter(index)}
                sx={{ flex: 1 }}
              >
                {letter.rlConfirm === 'YES' ? 'Approved' : 'Approve & Continue'}
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

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

export default TaskRecommendationLetters; 