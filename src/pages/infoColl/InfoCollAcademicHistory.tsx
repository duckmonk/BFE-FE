import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Box, Typography, TextField, MenuItem, Snackbar, Alert, Button } from '@mui/material';
import FileUploadButton from '../../components/FileUploadButton';
import { infoCollApi } from '../../services/api';
import { extractFileName } from '../../services/s3Service';

const degreeOptions = ['Bachelor\'s', 'Master\'s', 'Doctorate', 'Other'];
const statusOptions = ['Completed', 'Ongoing', 'Other'];
const yesNoOptions = ['Yes', 'No'];
const countryOptions = ['USA', 'China', 'Canada', 'Other']; // 可根据需要扩展

interface AcademicHistory {
  id?: number;
  clientCaseId: number;
  degree: string;
  schoolName: string;
  status: string;
  startDate: string;
  endDate: string;
  major: string;
  docLanguage: string;
  transcriptsOriginal: string;
  transcriptsTranslated: string;
  diplomaOriginal: string;
  diplomaTranslated: string;
  country: string;
}

const InfoCollAcademicHistory = forwardRef(({ clientCaseId }: { clientCaseId: number }, ref) => {
  const [academicHistories, setAcademicHistories] = useState<AcademicHistory[]>([]);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (clientCaseId) {
      infoCollApi.getAcademicHistory(clientCaseId).then(res => {
        if (res && res.data && Array.isArray(res.data)) {
          setAcademicHistories(res.data);
        }
      }).catch(() => {
        // 可以加错误提示
      });
    }
  }, [clientCaseId]);

  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedHistories = [...academicHistories];
    updatedHistories[index] = { ...updatedHistories[index], [name]: value };
    setAcademicHistories(updatedHistories);
  };

  const handleSelectChange = (index: number, name: string) => (e: any) => {
    const updatedHistories = [...academicHistories];
    updatedHistories[index] = { ...updatedHistories[index], [name]: e.target.value };
    setAcademicHistories(updatedHistories);
  };

  const handleFileUrlChange = (index: number, name: string, url: string | null) => {
    const updatedHistories = [...academicHistories];
    updatedHistories[index] = { ...updatedHistories[index], [name]: url };
    setAcademicHistories(updatedHistories);
  };

  const handleAdd = () => {
    setAcademicHistories(prev => [...prev, {
      clientCaseId,
      degree: '',
      schoolName: '',
      status: '',
      startDate: '',
      endDate: '',
      major: '',
      docLanguage: '',
      transcriptsOriginal: '',
      transcriptsTranslated: '',
      diplomaOriginal: '',
      diplomaTranslated: '',
      country: ''
    }]);
  };

  const handleDelete = (index: number) => {
    setAcademicHistories(prev => prev.filter((_, i) => i !== index));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  useImperativeHandle(ref, () => ({
    submit: async () => {
      try {
        await infoCollApi.submitAcademicHistory(academicHistories);
        setSnackbar({ open: true, message: '保存成功', severity: 'success' });
      } catch (e: any) {
        setSnackbar({ open: true, message: e?.message || '保存失败', severity: 'error' });
      }
    }
  }));

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Academic History</Typography>

      {academicHistories.map((history, index) => (
        <Box key={index} component="form" noValidate autoComplete="off" sx={{ mb: 4, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={600}>Academic History {index + 1}</Typography>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleDelete(index)}
            >
              Delete
            </Button>
          </Box>

          <TextField 
            label="Respondents (autogenerated)" 
            fullWidth 
            size="small" 
            sx={{ mb: 2 }} 
            InputProps={{ readOnly: true }} 
            value="自动生成" 
          />

          <TextField
            name="degree"
            label="Degree"
            select
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            value={history.degree || ''}
            onChange={handleSelectChange(index, 'degree')}
            required
          >
            {degreeOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
          </TextField>

          <TextField
            name="schoolName"
            label="School Name"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            value={history.schoolName || ''}
            onChange={handleChange(index)}
            required
          />

          <TextField
            name="status"
            label="Status"
            select
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            value={history.status || ''}
            onChange={handleSelectChange(index, 'status')}
            required
          >
            {statusOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
          </TextField>

          <TextField
            name="startDate"
            label="Start Date"
            type="date"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
            value={history.startDate || ''}
            onChange={handleChange(index)}
            required
          />

          <TextField
            name="endDate"
            label="End Date"
            type="date"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
            value={history.endDate || ''}
            onChange={handleChange(index)}
            required={history.status === 'Completed'}
          />

          <TextField
            name="major"
            label="Major"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            value={history.major || ''}
            onChange={handleChange(index)}
            required
          />

          <TextField
            name="docLanguage"
            label="Is your original document in English?"
            select
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            value={history.docLanguage || ''}
            onChange={handleSelectChange(index, 'docLanguage')}
            required
          >
            {yesNoOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
          </TextField>

          <FileUploadButton
            label="Upload Copy of Transcripts - Original (PDF)"
            fileType="transcriptsOriginal"
            onFileUrlChange={url => handleFileUrlChange(index, 'transcriptsOriginal', url)}
            required
            fileUrl={history.transcriptsOriginal}
            fileName={history.transcriptsOriginal && extractFileName(history.transcriptsOriginal)}
          />

          {history.docLanguage === 'No' && (
            <FileUploadButton
              label="Upload Copy of Transcripts - Translated (PDF)"
              fileType="transcriptsTranslated"
              onFileUrlChange={url => handleFileUrlChange(index, 'transcriptsTranslated', url)}
              required
              fileUrl={history.transcriptsTranslated}
              fileName={history.transcriptsTranslated && extractFileName(history.transcriptsTranslated)}
            />
          )}

          <FileUploadButton
            label="Upload Copy of Diploma - Original (PDF)"
            fileType="diplomaOriginal"
            onFileUrlChange={url => handleFileUrlChange(index, 'diplomaOriginal', url)}
            required
            fileUrl={history.diplomaOriginal}
            fileName={history.diplomaOriginal && extractFileName(history.diplomaOriginal)}
          />

          {history.docLanguage === 'No' && (
            <FileUploadButton
              label="Upload Copy of Diploma - Translated (PDF)"
              fileType="diplomaTranslated"
              onFileUrlChange={url => handleFileUrlChange(index, 'diplomaTranslated', url)}
              required
              fileUrl={history.diplomaTranslated}
              fileName={history.diplomaTranslated && extractFileName(history.diplomaTranslated)}
            />
          )}

          <TextField
            name="country"
            label="Country"
            select
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            value={history.country || ''}
            onChange={handleSelectChange(index, 'country')}
            required
          >
            {countryOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
          </TextField>
        </Box>
      ))}

      <Button
        variant="contained"
        onClick={handleAdd}
        sx={{ mb: 2 }}
      >
        Add Academic History
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

export default InfoCollAcademicHistory; 