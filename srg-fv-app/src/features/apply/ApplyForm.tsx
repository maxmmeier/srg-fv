import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ApplyMembershipOptions } from '@srg-fv/srg-fv-contract/applyMembershipOptions';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { FormTexField } from '../../shared/FormTextField';
import Grid from '@mui/material/Grid';
import { FormSignature } from '../../shared/FormSignature';
import { FormCheckbox } from '../../shared/FormCheckbox';
import { Button } from '../../shared/buttons/Button';
import * as z from 'zod';
import { formatIban, validateIban } from './Iban';

type Props = Readonly<{
  submit: () => void;
}>;

export function ApplyForm({ submit }: Props) {
  const { t } = useTranslation();

  type ApplyInput = z.infer<typeof ApplySchema>;

  const defaultValues: ApplyInput = {
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

  const ApplySchema = z
    .object({
      lastName: z.string().min(1, t('lastNameFeedback')),
      firstName: z.string().min(1, t('firstNameFeedback')),
      email: z.email(t('emailFeedback')),
      dateOfBirth: z.iso.date(),
      street: z.string().min(1, t('streetFeedback')),
      zip: z.string().regex(/^\d{5}$/, t('zipFeedback')),
      city: z.string().min(1, t('cityFeedback')),
      memberSignature: z.string().min(1, t('signatureFeedback')),
      isMemberNotAccountHolder: z.boolean(),
      lastNameSepa: z.string(),
      firstNameSepa: z.string(),
      streetSepa: z.string(),
      zipSepa: z.string(),
      citySepa: z.string(),
      bank: z.string().min(1, t('bankFeedback')),
      bic: z.string().min(1, t('bicFeedback')),
      iban: z.string().min(1, t('ibanFeedback')),
      mandate: z.string().min(1, t('mandateFeedback')),
      sepaSignature: z.string().min(1, t('signatureFeedback')),
    })
    .refine(
      (data) => !data.isMemberNotAccountHolder || data.lastNameSepa.length > 0,
      {
        error: t('lastNameFeedback'),
        path: ['lastNameSepa'],
      },
    )
    .refine(
      (data) => !data.isMemberNotAccountHolder || data.firstNameSepa.length > 0,
      {
        error: t('firstNameFeedback'),
        path: ['firstNameSepa'],
      },
    )
    .refine(
      (data) => !data.isMemberNotAccountHolder || data.streetSepa.length > 0,
      {
        error: t('streetFeedback'),
        path: ['streetSepa'],
      },
    )
    .refine(
      (data) => !data.isMemberNotAccountHolder || data.zipSepa.length > 0,
      {
        error: t('zipFeedback'),
        path: ['zipSepa'],
      },
    )
    .refine(
      (data) => !data.isMemberNotAccountHolder || data.citySepa.length > 0,
      {
        error: t('cityFeedback'),
        path: ['citySepa'],
      },
    )
    .refine((data) => validateIban(data.iban), {
      error: t('ibanInvalidFeedback'),
      path: ['iban'],
    })
    .refine(
      (data) =>
        new Date(data.dateOfBirth) <
        new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
      {
        error: t('dateOfBirthFeedback'),
        path: ['dateOfBirth'],
      },
    );

  const { register, control, handleSubmit, reset, watch, setValue } =
    useForm<ApplyInput>({
      defaultValues: defaultValues,
      resolver: zodResolver(ApplySchema),
    });

  const showSepa = watch('isMemberNotAccountHolder', true);

  const onSubmit = useCallback(async (data: ApplyInput) => {
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
      iban: formatIban(data.iban),
      mandate: data.mandate,
      sepaSignature: data.sepaSignature,
    };

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
