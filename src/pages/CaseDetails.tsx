import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Typography, Grid, Paper, List, ListItem, ListItemText, Button, Collapse } from '@mui/material';
import InfoCollBasicInfo from './infoColl/InfoCollBasicInfo';
import { clientCaseApi } from '../services/api'; // 你需要实现这个API
import InfoCollSpouseInfo from './infoColl/InfoCollSpouseInfo';
import InfoCollChildrenInfo from './infoColl/InfoCollChildrenInfo';
import InfoCollResume from './infoColl/InfoCollResume';
import InfoCollAcademicHistory from './infoColl/InfoCollAcademicHistory';
import InfoCollEmploymentHistory from './infoColl/InfoCollEmploymentHistory';
import TaskEndeavorSubmission from './tasks/TaskEndeavorSubmission';
import { getUserType } from '../utils/user';
import TaskNationalImportance from './tasks/TaskNationalImportance';

const sections = [
  {
    title: 'Information Collection',
    collapsable: true,
    children: [
      { label: 'Basic Info', form: InfoCollBasicInfo },
      { label: 'Spouse Info', form: InfoCollSpouseInfo },
      { label: 'Children Info', form: InfoCollChildrenInfo },
      { label: 'Resume', form: InfoCollResume },
      { label: 'Academic History', form: InfoCollAcademicHistory },
      { label: 'Employment History', form: InfoCollEmploymentHistory }
    ]
  },
  {
    title: 'Tasks',
    collapsable: true,
    children: [
      { label: 'Task 1: Endeavor Submission', form: TaskEndeavorSubmission },
      { label: 'Task 2: National Importance', form: TaskNationalImportance },
      { label: 'Task 3: Petitioner\'s Future Plan', form: TaskNationalImportance },
      { label: 'Task 4: Prong 2 - Substantial Merits', form: TaskNationalImportance },
      { label: 'Task 5: Recommendation Letters', form: TaskNationalImportance },
      { label: 'Task 6: Prong 2 - Well Positioned', form: TaskNationalImportance },
      { label: 'Task 7: Prong 3 - Balancing Factors', form: TaskNationalImportance },
    ]
  }
];

const CaseDetails: React.FC = () => {
  const [selected, setSelected] = useState({ section: 0, child: 0 });
  const [openSections, setOpenSections] = useState(() => sections.map(() => true));
  const formRef = useRef<any>(null);
  const [clientCase, setClientCase] = useState<any | null>(null);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const res = await clientCaseApi.getCurrentCase();
        console.log('res', res);
        setClientCase(res.data);
      } catch (e) {
        setClientCase(null);
      }
    };
    fetchCase();
  }, []);

  const handleSectionClick = (idx: number) => {
    setOpenSections(prev => prev.map((open, i) => i === idx ? !open : open));
  };

  const handleSave = async () => {
    if (formRef.current && typeof formRef.current.submit === 'function') {
      await formRef.current.submit(clientCase);
    }
  };

  // 动态获取当前表单组件
  const CurrentForm = sections[selected.section].children[selected.child].form;

  // 判断是否显示保存按钮
  const shouldShowSaveButton = () => {
    return selected.section === 0 && getUserType() === 'admin'; // TODO client
  };

  return (
    <Box sx={{ bgcolor: '#fafbfc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ pt: 6, pb: 6, flex: 1 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 4 }}>
          NW Process
        </Typography>
        <Grid container spacing={4}>
          {/* 左侧步骤导航 */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper sx={{ bgcolor: '#fff', borderRadius: 2, p: 0, boxShadow: 0, border: '1px solid #e0e6ef' }}>
              <List disablePadding>
                {sections.map((section, sIdx) => (
                  <Box key={section.title}>
                    <ListItem
                      sx={{ pl: 4, py: 1, bgcolor: '#f6f8fa', fontWeight: 700, cursor: 'pointer', borderLeft: '3px solid #1976d2', display: 'flex', alignItems: 'center' }}
                      onClick={() => handleSectionClick(sIdx)}
                    >
                      <Box sx={{ mr: 1, fontSize: 12, color: '#888', display: 'flex', alignItems: 'center' }}>
                        {openSections[sIdx] ? '▼' : '▶'}
                      </Box>
                      <ListItemText primary={<Typography fontWeight={700} fontSize={15}>{section.title}</Typography>} />
                    </ListItem>
                    <Collapse in={openSections[sIdx]} timeout="auto" unmountOnExit>
                      {section.children.map((child, cIdx) => (
                        <ListItem
                          key={child.label}
                          sx={{
                            pl: 6,
                            py: 1,
                            cursor: 'pointer',
                            bgcolor: selected.section === sIdx && selected.child === cIdx ? '#159895' : undefined,
                            borderLeft: selected.section === sIdx && selected.child === cIdx ? '3px solid #1976d2' : '3px solid transparent',
                          }}
                          onClick={() => setSelected({ section: sIdx, child: cIdx })}
                        >
                          <ListItemText
                            primary={
                              <Typography
                                fontWeight={selected.section === sIdx && selected.child === cIdx ? 600 : 400}
                                fontSize={15}
                                sx={{ color: selected.section === sIdx && selected.child === cIdx ? '#fff' : undefined }}
                              >
                                {child.label}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </Collapse>
                  </Box>
                ))}
              </List>
            </Paper>
          </Grid>
          {/* 右侧表单区 */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Box sx={{ bgcolor: '#fff', borderRadius: 2, p: 4, border: '1px solid #e0e6ef', minHeight: 500, position: 'relative', pb: 12 }}>
              {/* 动态渲染表单并传递ref */}
              {CurrentForm && React.createElement(CurrentForm, { ref: formRef, clientCaseId: clientCase?.clientCaseId })}
              {shouldShowSaveButton() && (
                <Box sx={{ position: 'absolute', right: 32, bottom: 64 }}>
                  <Button variant="contained" color="primary" sx={{ px: 5, py: 1.2, fontWeight: 700 }} onClick={handleSave}>
                    Save
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CaseDetails; 