import { createPluginRegistration } from '@embedpdf/core';
import { EmbedPDF } from '@embedpdf/core/react';
import { usePdfiumEngine } from '@embedpdf/engines/react';
import { ConsoleLogger } from '@embedpdf/models';
import { Viewport, ViewportPluginPackage } from '@embedpdf/plugin-viewport/react';
import { Scroller, ScrollPluginPackage, ScrollStrategy } from '@embedpdf/plugin-scroll/react';
import { LoaderPluginPackage } from '@embedpdf/plugin-loader/react';
import { RenderLayer, RenderPluginPackage } from '@embedpdf/plugin-render/react';
import { TilingLayer, TilingPluginPackage } from '@embedpdf/plugin-tiling/react';
import { MarqueeZoom, ZoomMode, ZoomPluginPackage } from '@embedpdf/plugin-zoom/react';
import { SearchLayer, SearchPluginPackage } from '@embedpdf/plugin-search/react';
import {
  GlobalPointerProvider,
  PagePointerProvider,
  InteractionManagerPluginPackage,
} from '@embedpdf/plugin-interaction-manager/react';
import { PanPluginPackage } from '@embedpdf/plugin-pan/react';
import { Rotate, RotatePluginPackage } from '@embedpdf/plugin-rotate/react';
import { SpreadPluginPackage } from '@embedpdf/plugin-spread/react';
import { FullscreenPluginPackage } from '@embedpdf/plugin-fullscreen/react';
import { ExportPluginPackage } from '@embedpdf/plugin-export/react';
import { ThumbnailPluginPackage } from '@embedpdf/plugin-thumbnail/react';
import { SelectionPluginPackage } from '@embedpdf/plugin-selection/react';
import { SelectionLayer } from '@embedpdf/plugin-selection/react';

import { CircularProgress, Box, Alert } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useMemo } from 'react';

import { PageControls } from './components/page-controls';
import { Search } from './components/search';
import { Drawer, DrawerComponent, DrawerProvider } from './components/drawer-system';
import { Sidebar } from './components/sidebar';
import { Toolbar } from './components/toolbar';
import { ViewSidebarReverseIcon } from './icons';

const plugins = [
  createPluginRegistration(LoaderPluginPackage, {
    loadingOptions: {
      type: 'url',
      pdfFile: {
        id: 'pdf',
        url: 'https://snippet.embedpdf.com/ebook.pdf',
      },
    },
  }),
  createPluginRegistration(ViewportPluginPackage, {
    viewportGap: 10,
  }),
  createPluginRegistration(ScrollPluginPackage, {
    strategy: ScrollStrategy.Vertical,
  }),
  createPluginRegistration(RenderPluginPackage),
  createPluginRegistration(TilingPluginPackage, {
    tileSize: 768,
    overlapPx: 2.5,
    extraRings: 0,
  }),
  createPluginRegistration(ZoomPluginPackage, {
    defaultZoomLevel: ZoomMode.FitPage,
  }),
  createPluginRegistration(SearchPluginPackage),
  createPluginRegistration(InteractionManagerPluginPackage),
  createPluginRegistration(PanPluginPackage),
  createPluginRegistration(RotatePluginPackage),
  createPluginRegistration(SpreadPluginPackage),
  createPluginRegistration(FullscreenPluginPackage),
  createPluginRegistration(ExportPluginPackage),
  createPluginRegistration(ThumbnailPluginPackage),
  createPluginRegistration(SelectionPluginPackage),
];

const drawerComponents: DrawerComponent[] = [
  {
    id: 'search',
    component: Search,
    icon: SearchOutlinedIcon,
    label: 'Search',
    position: 'right',
  },
  {
    id: 'sidebar',
    component: Sidebar,
    icon: ViewSidebarReverseIcon,
    label: 'Sidebar',
    position: 'left',
  },
];

const consoleLogger = new ConsoleLogger();

function App() {
  const isDev = useMemo(
    () => new URLSearchParams(window.location.search).get('dev') === 'true',
    [],
  );

  const { engine, isLoading, error } = usePdfiumEngine(isDev ? { logger: consoleLogger } : {});

  if (error) {
    return (
      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Alert severity="error">Failed to initialize PDF viewer:</Alert>
      </Box>
    );
  }

  if (isLoading || !engine) {
    return (
      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size={48} />
      </Box>
    );
  }

  return (
    <DrawerProvider components={drawerComponents}>
      <EmbedPDF engine={engine} plugins={plugins}>
        {({ pluginsReady }) => (
          <Box
            sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              userSelect: 'none',
            }}
          >
            <Toolbar />

            {/* Main content area with sidebars */}
            <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
              {/* Left Sidebar */}
              <Drawer position="left" />

              {/* Main Viewport */}
              <Box
                sx={{
                  flex: '1 1 0', // grow / shrink, flex-basis 0
                  minWidth: 0, // allow shrinking inside flex row
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <GlobalPointerProvider>
                  <Viewport
                    style={{
                      width: '100%',
                      height: '100%',
                      flexGrow: 1,
                      backgroundColor: '#f1f3f5',
                      overflow: 'auto',
                    }}
                  >
                    {!pluginsReady && (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          width: '100%',
                        }}
                      >
                        <CircularProgress size={48} />
                      </Box>
                    )}
                    {pluginsReady && (
                      <Scroller
                        renderPage={({ document, width, height, pageIndex, scale, rotation }) => (
                          <Rotate key={document?.id} pageSize={{ width, height }}>
                            <PagePointerProvider
                              pageIndex={pageIndex}
                              pageWidth={width}
                              pageHeight={height}
                              rotation={rotation}
                              scale={scale}
                              style={{
                                width,
                                height,
                              }}
                            >
                              <RenderLayer
                                pageIndex={pageIndex}
                                style={{ pointerEvents: 'none' }}
                              />
                              <TilingLayer
                                pageIndex={pageIndex}
                                scale={scale}
                                style={{ pointerEvents: 'none' }}
                              />
                              <SearchLayer
                                pageIndex={pageIndex}
                                scale={scale}
                                style={{ pointerEvents: 'none' }}
                              />
                              <MarqueeZoom pageIndex={pageIndex} scale={scale} />
                              <SelectionLayer pageIndex={pageIndex} scale={scale} />
                            </PagePointerProvider>
                          </Rotate>
                        )}
                      />
                    )}
                    <PageControls />
                  </Viewport>
                </GlobalPointerProvider>
              </Box>

              {/* Right Sidebar */}
              <Drawer position="right" />
            </Box>
          </Box>
        )}
      </EmbedPDF>
    </DrawerProvider>
  );
}

export default App;
