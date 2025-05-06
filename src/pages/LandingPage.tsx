import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, Button, Stack, Dialog, DialogContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TaskEndeavorSubmission from './tasks/TaskEndeavorSubmission';
import TaskNationalImportance from './tasks/TaskNationalImportance';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [openTask1Dialog, setOpenTask1Dialog] = useState(false);
  const [openTask2Dialog, setOpenTask2Dialog] = useState(false);

  const handleTask1Click = () => {
    setOpenTask1Dialog(true);
  };

  const handleTask2Click = () => {
    setOpenTask2Dialog(true);
  };

  const handleCloseTask1Dialog = () => {
    setOpenTask1Dialog(false);
  };

  const handleCloseTask2Dialog = () => {
    setOpenTask2Dialog(false);
  };

  return (
    <Box sx={{ bgcolor: '#fafbfc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ pt: 6, pb: 6, flex: 1 }}>
        <Box sx={{ display: 'flex', gap: 4 }}>
          {/* 左侧 */}
          <Box sx={{ flex: 7, minWidth: 0 }}>
            <Paper sx={{ p: 2, borderRadius: 3, mb: 2, height: '100%'}}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: '#F9FAFC',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                position: 'relative',
                top: -16,
                left: -16,
                right: -16,
                width: 'calc(100% + 32px)',
                boxSizing: 'border-box',
              }}>
                <Typography variant="h6" fontWeight={700} sx={{ pl: 3, pt: 2, pb: 2 }}>
                  Case Processing
                </Typography>
              </Box>
              {/* 嵌套大卡片 */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ bgcolor: '#fff', borderRadius: 2, p: 2, border: '2px solid #e0e6ef', mb: 2 }}>
                  <Grid container spacing={2} alignItems="stretch">
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box 
                        sx={{ 
                          bgcolor: '#F9FAFC', 
                          border: '2px solid #cfd8dc', 
                          borderRadius: 2, 
                          p: 2, 
                          height: '100%', 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'center',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: '#f0f4f8',
                          }
                        }}
                        onClick={handleTask1Click}
                      >
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>(Our To-Do)</Typography>
                        <Typography variant="subtitle1" fontWeight={700}>
                          Task 1: Endeavor
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box 
                        sx={{ 
                          bgcolor: '#F9FAFC', 
                          border: '2px solid #cfd8dc', 
                          borderRadius: 2, 
                          p: 2, 
                          height: '100%', 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'center',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: '#f0f4f8',
                          }
                        }}
                        onClick={handleTask2Click}
                      >
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>(Our To-Do)</Typography>
                        <Typography variant="subtitle1" fontWeight={700}>
                          Task 2: National Importance
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Box sx={{ bgcolor: '#f3f6fa', borderRadius: 1, p: 1, textAlign: 'center', color: '#888', fontWeight: 500, fontSize: 15, mt: 2 }}>
                        After Tasks 1 & 2, complete Future Plan
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ bgcolor: '#F9FAFC', border: '2px solid #cfd8dc', borderRadius: 2, p: 2, mb: 1, height: '50%' }}>
                      <Typography variant="body2" color="text.secondary" fontWeight={600}>(Your To-Do)</Typography>
                      <Typography variant="subtitle1" fontWeight={700}>Task 3: Future Plan</Typography>
                      <Typography variant="caption" color="text.secondary">"After Task 2 completion"</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ bgcolor: '#F9FAFC', border: '2px solid #cfd8dc', borderRadius: 2, p: 2, mb: 1, height: '50%' }}>
                      <Typography variant="body2" color="text.secondary" fontWeight={600}>(Our To-Do)</Typography>
                      <Typography variant="subtitle1" fontWeight={700}>Task 4: Substantial Merit</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ bgcolor: '#F9FAFC', border: '2px solid #cfd8dc', borderRadius: 2, p: 2, mb: 1, height: '100%' }}>
                      <Typography variant="body2" color="text.secondary" fontWeight={600}>(Shared To-Do)</Typography>
                      <Typography variant="subtitle1" fontWeight={700}>Task 5: Recommendation Letters</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: 13 }}>
                        - Task 5.1: RL 1<br />
                        - Task 5.2: RL 2<br />
                        - Task 5.3: RL 3<br />
                        - Task 5.4: RL 4
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ bgcolor: '#F9FAFC', border: '2px solid #cfd8dc', borderRadius: 2, p: 2, mb: 1, height: '100%' }}>
                      <Typography variant="body2" color="text.secondary" fontWeight={600}>(Our To-Do)</Typography>
                      <Typography variant="subtitle1" fontWeight={700}>Task 6: Well Positioned</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ bgcolor: '#F9FAFC', border: '2px solid #cfd8dc', borderRadius: 2, p: 2, mb: 1, height: '100%' }}>
                      <Typography variant="body2" color="text.secondary" fontWeight={600}>(Our To-Do)</Typography>
                      <Typography variant="subtitle1" fontWeight={700}>Task 7: Prong 3</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ bgcolor: '#F9FAFC', border: '2px solid #cfd8dc', borderRadius: 2, p: 2, height: '100%' }}>
                      <Typography variant="body2" color="text.secondary" fontWeight={600}>(Shared To-Do)</Typography>
                      <Typography variant="subtitle1" fontWeight={700}>Task 8: Final Forms</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
                        Forms & Documentation
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
          {/* 右侧 */}
          <Box sx={{ flex: 5, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <Paper sx={{ p: 3, borderRadius: 3, height: '100%', flex: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  bgcolor: '#F9FAFC',
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  position: 'relative',
                  top: -24,
                  left: -24,
                  right: -24,
                  width: 'calc(100% + 48px)',
                  boxSizing: 'border-box',
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/guidelines')}
              >
                <Typography variant="h6" fontWeight={700} sx={{ pl: 3, pt: 2, pb: 2 }}>
                  Application Guidelines
                </Typography>
                <Box sx={{ mr: 3, color: '#bdbdbd', fontSize: 20, display: 'flex', alignItems: 'center' }}>
                  ▶
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, ml: 0 }}>
                Click to view detailed guidelines on how to prepare your NIW application.
              </Typography>
              <Stack spacing={2}>
                <Paper sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Form Filling Instructions
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Guidance on completing each required USCIS form correctly.
                  </Typography>
                </Paper>
                <Paper sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Supporting Documents
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Requirements for evidence and supplementary materials.
                  </Typography>
                </Paper>
                <Paper sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Submission Process
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Step-by-step instructions for final submission and tracking.
                  </Typography>
                </Paper>
              </Stack>
            </Paper>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            sx={{ bgcolor: '#000', color: '#fff', borderRadius: 2, fontWeight: 700, px: 6, py: 1.5 }}
            onClick={() => navigate('/case-details')}
          >
            Begin NIW Application Process
          </Button>
        </Box>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            For assistance, contact: support@breakfreeearth.com
          </Typography>
        </Box>
      </Container>

      {/* Task 1 Dialog */}
      <Dialog 
        open={openTask1Dialog} 
        onClose={handleCloseTask1Dialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <DialogContent sx={{ p: 3 }}>
          <TaskEndeavorSubmission clientCaseId={1} />
        </DialogContent>
      </Dialog>

      {/* Task 2 Dialog */}
      <Dialog 
        open={openTask2Dialog} 
        onClose={handleCloseTask2Dialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <DialogContent sx={{ p: 3 }}>
          <TaskNationalImportance clientCaseId={1} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LandingPage; 