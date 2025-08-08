import { Request, Response, NextFunction } from 'express';
import { ApplyMembershipOptions } from '@srg-fv/srg-fv-contract/applyMembershipOptions';
import { GetMembershipPdfOptions } from '@srg-fv/srg-fv-contract/getMembershipPdfOptions';
import dotenv from 'dotenv';
import {
  addMembership as internalAddMemebership,
  getMemberships as internalGetMemberships,
  getMembership as internalGetMembership,
  getPdf as internalGetPdf,
  deleteMembership as internalDeleteMembership,
} from '../logic/membershipLogic';

dotenv.config();

export async function applyMembership(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const options = req.body as ApplyMembershipOptions;

    await internalAddMemebership(options);

    res.status(201).json();
  } catch (error) {
    next(error);
  }
}

export async function getMemberships(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const page = parseInt(req.query.page as string);
    const search = decodeURI(req.query.search as string);

    var members = await internalGetMemberships(page, search);

    res.status(200).json(members);
  } catch (error) {
    next(error);
  }
}

export async function getPdf(req: Request, res: Response, next: NextFunction) {
  try {
    const options = req.body as GetMembershipPdfOptions;

    var membership = await internalGetMembership(options.id);
    var pdf = await internalGetPdf(membership);

    res.status(200).json(pdf);
  } catch (error) {
    next(error);
  }
}

export async function deleteMembership(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = parseInt(req.params.id);

    await internalDeleteMembership(id);

    res.status(204).json();
  } catch (error) {
    next(error);
  }
}
