import { sendEmail } from '../logic/emailLogic';
import {
  confirmEmailSent,
  getAllMembershipsWithUnsetEmails,
} from '../logic/membershipEmailLogic';
import { getMembership, getPdf } from '../logic/membershipLogic';

export async function execute() {
  const unsetMembershipEmails = await getAllMembershipsWithUnsetEmails();

  unsetMembershipEmails.forEach(async (unsentEmail) => {
    var membership = await getMembership(unsentEmail.id);
    var pdf = await getPdf(membership);
    var success = await sendEmail(membership, pdf);
    if (success) {
      await confirmEmailSent(unsentEmail.id);
    }
  });
}
