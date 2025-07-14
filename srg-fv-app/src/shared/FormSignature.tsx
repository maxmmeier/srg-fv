import InputLabel from '@mui/material/InputLabel';
import { useTranslation } from 'react-i18next';
import SignatureCanvas from 'react-signature-canvas';
import ClearIcon from '@mui/icons-material/Clear';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useContainerDimensions } from '../features/apply/WrapperDimensions';
import { Button } from './buttons/Button';
import Box from '@mui/material/Box';
import { ControllerFieldState } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';

type Props = Readonly<{
  fieldName: string;
  fieldState: ControllerFieldState;
  setValue: (value: string) => void;
}>;

export function FormSignature({ fieldName, fieldState, setValue }: Props) {
  const { t } = useTranslation();
  const canvasWrapper = useRef(null);
  const signatureCanvas = useRef<SignatureCanvas>(null);
  const dimensions = useContainerDimensions(canvasWrapper);
  const [refAquired, setRefAquired] = useState(false);

  useEffect(() => {
    if (!signatureCanvas.current) {
      return;
    }
    setRefAquired(true);

    signatureCanvas.current?.clear();
  }, [refAquired]);

  const handleEnd = useCallback(() => {
    setValue(
      signatureCanvas.current?.getCanvas().toDataURL('image/jpeg') ?? '',
    );
  }, []);

  const handleClear = useCallback(() => {
    signatureCanvas.current?.clear();
    setValue('');
  }, []);

  return (
    <>
      <InputLabel>{t(fieldName)}</InputLabel>

      <Box
        ref={canvasWrapper}
        sx={{
          position: 'relative',
          border: '1px solid #dee2e6',
          height: '10vh',
        }}>
        <SignatureCanvas
          ref={signatureCanvas}
          backgroundColor='rgb(255,255,255)'
          canvasProps={{
            width: dimensions.width,
            height: dimensions.height,
          }}
          onEnd={handleEnd}></SignatureCanvas>
        <Button
          onClick={handleClear}
          variant='contained'
          color='info'
          sx={{ position: 'absolute', top: 1, right: 1 }}>
          <ClearIcon />
        </Button>
      </Box>
      {fieldState.error ? (
        <FormHelperText error>{fieldState.error.message}</FormHelperText>
      ) : (
        <></>
      )}
    </>
  );
}
