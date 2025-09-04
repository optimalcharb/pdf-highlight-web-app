import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import {
  Box,
  Divider,
  AppBar,
  Toolbar as MuiToolbar,
  IconButton,
} from '@mui/material';

import { ZoomControls } from '../zoom-controls';
import { DrawerToggleButton } from '../drawer-system';
import { useExportCapability } from '@embedpdf/plugin-export/react';

export const Toolbar = () => {
  const { provides: exportProvider } = useExportCapability();

  const handleDownload = () => {
    exportProvider?.download();
  };

  return (
    <AppBar position="static">
      <MuiToolbar variant="dense" disableGutters sx={{ gap: 1.5, px: 1.5 }}>
        <IconButton
          edge="start"
          size="small"
          sx={{ color: 'white' }}
          onClick={handleDownload}
          aria-label="download"
        >
          <DownloadOutlinedIcon fontSize="small" />
        </IconButton>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ backgroundColor: 'white', my: 1.2, opacity: 0.5 }}
        />
        <DrawerToggleButton componentId="sidebar" />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ backgroundColor: 'white', my: 1.2, opacity: 0.5 }}
        />
        <ZoomControls />
        <Box sx={{ flexGrow: 1 }} />
        <DrawerToggleButton componentId="search" />
      </MuiToolbar>
    </AppBar>
  );
};
