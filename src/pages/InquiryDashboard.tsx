import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Grid, TextField, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const data = [
  {
    timestamp: '2025-02-24 HH:MM',
    email: 'XXX@gmail.com',
    name: 'dan',
    field: 'privacy',
    workBenefits: 'yes',
    govProjects: 'yes',
    highImpact: 'no',
    keyRole: 'yes',
    innovations: 'no',
    achievements: 'invited_speaker, research_funding',
    platform: 'rednote',
    handle: 'abcd'
  },
  {
    timestamp: '2025-02-24 HH:MM',
    email: 'XXX@gmail.com',
    name: 'joe',
    field: 'DS',
    workBenefits: 'no',
    govProjects: 'no',
    highImpact: 'no',
    keyRole: 'no',
    innovations: 'no',
    achievements: 'N/A',
    platform: 'rednote',
    handle: 'efd'
  }
];

export default function InquiryDashboard() {
  return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', bgcolor: '#fff', borderRadius: 2, boxShadow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" fontWeight="bold">Marketing Inquiry Dashboard</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography>Welcome, User</Typography>
            <IconButton><AccountCircleIcon /></IconButton>
          </Box>
        </Box>

        {/* 筛选区 */}
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField fullWidth label="Inquiry Date Range" placeholder="mm/dd/yyyy" size="small" />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Select fullWidth size="small" defaultValue="">
              <MenuItem value="">All Fields</MenuItem>
              <MenuItem value="privacy">privacy</MenuItem>
              <MenuItem value="DS">DS</MenuItem>
            </Select>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Select fullWidth size="small" defaultValue="">
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="type1">Type 1</MenuItem>
              <MenuItem value="type2">Type 2</MenuItem>
            </Select>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Select fullWidth size="small" defaultValue="">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Select fullWidth size="small" defaultValue="">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </Grid>
        </Grid>

        {/* 数据表格 */}
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Inquiry Timestamp</TableCell>
                <TableCell>Petitioner Email</TableCell>
                <TableCell>Petitioner Name</TableCell>
                <TableCell>Petitioner Field</TableCell>
                <TableCell>Work Benefits</TableCell>
                <TableCell>US Gov Projects</TableCell>
                <TableCell>High Impact Projects</TableCell>
                <TableCell>Key Role Verification</TableCell>
                <TableCell>Applied Innovations</TableCell>
                <TableCell>Achievements</TableCell>
                <TableCell>Social Platform</TableCell>
                <TableCell>Social Handle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.timestamp}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.field}</TableCell>
                  <TableCell>{row.workBenefits}</TableCell>
                  <TableCell>{row.govProjects}</TableCell>
                  <TableCell>{row.highImpact}</TableCell>
                  <TableCell>{row.keyRole}</TableCell>
                  <TableCell>{row.innovations}</TableCell>
                  <TableCell>{row.achievements}</TableCell>
                  <TableCell>{row.platform}</TableCell>
                  <TableCell>{row.handle}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
  );
} 