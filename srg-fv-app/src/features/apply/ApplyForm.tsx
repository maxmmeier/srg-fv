import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ApplyMembershipOptions } from '../../../../srg-fv-contract/applyMembershipOptions';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { InferType } from 'yup';
import Typography from '@mui/material/Typography';
import { FormTexField } from '../../shared/FormTextField';
import Grid from '@mui/material/Grid';
import { FormSignature } from '../../shared/FormSignature';
import { FormCheckbox } from '../../shared/FormCheckbox';
import { Button } from '../../shared/buttons/Button';

type Props = Readonly<{
  submit: () => void;
}>;

export function ApplyForm({ submit }: Props) {
  const { t } = useTranslation();

  type IApplyInput = InferType<typeof ApplySchema>;

  const defaultValues: IApplyInput = {
    lastName: '',
    firstName: '',
    email: '',
    dateOfBirth: '',
    street: '',
    zip: '',
    city: '',
    memberSignature: '',
    isMemberNotAccountHolder: false,
    lastNameSepa: '',
    firstNameSepa: '',
    streetSepa: '',
    zipSepa: '',
    citySepa: '',
    bank: '',
    bic: '',
    iban: '',
    mandate: '',
    sepaSignature: '',
  };

  const ApplySchema = yup.object().shape({
    lastName: yup.string().required(t('lastNameFeedback')),
    firstName: yup.string().required(t('firstNameFeedback')),
    email: yup.string().required(t('emailFeedback')),
    dateOfBirth: yup.string().required(t('dateOfBirthFeedback')),
    street: yup.string().required(t('streetFeedback')),
    zip: yup.string().required(t('zipFeedback')),
    city: yup.string().required(t('cityFeedback')),
    memberSignature: yup.string().required(t('signatureFeedback')),
    isMemberNotAccountHolder: yup.boolean().required(),
    lastNameSepa: yup.string().defined(t('lastNameFeedback')),
    firstNameSepa: yup.string().defined(t('firstNameFeedback')),
    streetSepa: yup.string().defined(t('streetFeedback')),
    zipSepa: yup.string().defined(t('zipFeedback')),
    citySepa: yup.string().defined(t('cityFeedback')),
    bank: yup.string().required(t('bankFeedback')),
    bic: yup.string().required(t('bicFeedback')),
    iban: yup.string().required(t('ibanFeedback')),
    mandate: yup.string().required(t('mandateFeedback')),
    sepaSignature: yup.string().required(t('signatureFeedback')),
  });

  const { register, control, handleSubmit, reset, watch, setValue } =
    useForm<IApplyInput>({
      defaultValues: defaultValues,
      resolver: yupResolver(ApplySchema),
    });

  const showSepa = watch('isMemberNotAccountHolder', true);

  const onSubmit = useCallback(async (data: IApplyInput) => {
    var result: ApplyMembershipOptions = {
      lastName: data.lastName,
      firstName: data.firstName,
      email: data.email,
      dateOfBirth: new Date(`${data.dateOfBirth}`)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      street: data.street,
      zip: data.zip,
      city: data.city,
      memberSignature: data.memberSignature,
      isMemberNotAccountHolder: data.isMemberNotAccountHolder,
      lastNameSepa: data.lastNameSepa,
      firstNameSepa: data.firstNameSepa,
      streetSepa: data.streetSepa,
      zipSepa: data.zipSepa,
      citySepa: data.citySepa,
      bank: data.bank,
      bic: data.bic,
      iban: data.iban,
      mandate: data.mandate,
      sepaSignature: data.sepaSignature,
    };

    console.log(result);
    return;

    await axios
      .post(import.meta.env.VITE_BACKEND_URL + 'membership/apply', result)
      .then(() => submit());
    reset(defaultValues);
    submit();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit, (data) => console.warn(data))}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Typography>{t('applyForMembershipIntro')}</Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='lastName'
            control={control}
            render={(field) => (
              <FormTexField
                {...register(field.field.name)}
                fieldName={field.field.name}
                fieldState={field.fieldState}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='firstName'
            control={control}
            render={(field) => (
              <FormTexField
                {...register(field.field.name)}
                fieldName={field.field.name}
                fieldState={field.fieldState}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='email'
            control={control}
            render={(field) => (
              <FormTexField
                {...register(field.field.name)}
                fieldName={field.field.name}
                fieldState={field.fieldState}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='dateOfBirth'
            control={control}
            render={(field) => (
              <FormTexField
                {...register(field.field.name)}
                fieldName={field.field.name}
                fieldState={field.fieldState}
                type='date'
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='street'
            control={control}
            render={(field) => (
              <FormTexField
                {...register(field.field.name)}
                fieldName={field.field.name}
                fieldState={field.fieldState}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Controller
            name='zip'
            control={control}
            render={(field) => (
              <FormTexField
                {...register(field.field.name)}
                fieldName={field.field.name}
                fieldState={field.fieldState}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Controller
            name='city'
            control={control}
            render={(field) => (
              <FormTexField
                {...register(field.field.name)}
                fieldName={field.field.name}
                fieldState={field.fieldState}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 12 }}>
          <Controller
            name='memberSignature'
            control={control}
            render={(field) => (
              <FormSignature
                {...register(field.field.name)}
                fieldName={field.field.name}
                fieldState={field.fieldState}
                setValue={(value: string) => setValue(field.field.name, value)}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography variant='h6' sx={{ marginBottom: 1 }}>
            {t('Sepa')}
          </Typography>

          <Typography>{t('SepaIntro')}</Typography>
          <Typography variant='subtitle1'>{t('SepaNotice')}</Typography>
          <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
            {t('SepaInfos')}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 12 }}>
          <Controller
            name='isMemberNotAccountHolder'
            control={control}
            render={(field) => (
              <FormCheckbox
                {...register(field.field.name)}
                fieldName={field.field.name}
                fieldState={field.fieldState}
              />
            )}
          />
        </Grid>

        {showSepa ? (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name='lastNameSepa'
                control={control}
                render={(field) => (
                  <FormTexField
                    {...register(field.field.name)}
                    fieldName={field.field.name}
                    fieldState={field.fieldState}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name='firstNameSepa'
                control={control}
                render={(field) => (
                  <FormTexField
                    {...register(field.field.name)}
                    fieldName={field.field.name}
                    fieldState={field.fieldState}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name='streetSepa'
                control={control}
                render={(field) => (
                  <FormTexField
                    {...register(field.field.name)}
                    fieldName={field.field.name}
                    fieldState={field.fieldState}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Controller
                name='zipSepa'
                control={control}
                render={(field) => (
                  <FormTexField
                    {...register(field.field.name)}
                    fieldName={field.field.name}
                    fieldState={field.fieldState}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Controller
                name='citySepa'
                control={control}
                render={(field) => (
                  <FormTexField
                    {...register(field.field.name)}
                    fieldName={field.field.name}
                    fieldState={field.fieldState}
                  />
                )}
              />
            </Grid>
          </>
        ) : (
          <></>
        )}

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='bank'
            control={control}
            render={(field) => (
              <FormTexField
                {...register(field.field.name)}
                fieldName={field.field.name}
                fieldState={field.fieldState}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='bic'
            control={control}
            render={(field) => (
              <FormTexField
                {...register(field.field.name)}
                fieldName={field.field.name}
                fieldState={field.fieldState}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='iban'
            control={control}
            render={(field) => (
              <FormTexField
                {...register(field.field.name)}
                fieldName={field.field.name}
                fieldState={field.fieldState}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='mandate'
            control={control}
            render={(field) => (
              <FormTexField
                {...register(field.field.name)}
                fieldName={field.field.name}
                fieldState={field.fieldState}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 12 }}>
          <Controller
            name='sepaSignature'
            control={control}
            render={(field) => (
              <FormSignature
                {...register(field.field.name)}
                fieldName={field.field.name}
                fieldState={field.fieldState}
                setValue={(value: string) => setValue(field.field.name, value)}
              />
            )}
          />
        </Grid>
      </Grid>

      <Button
        variant='contained'
        color='primary'
        type='submit'
        sx={{ float: 'right', marginTop: 2 }}>
        {t('submit')}
      </Button>
    </form>
  );
}
