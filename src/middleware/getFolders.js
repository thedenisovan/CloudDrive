import { prisma } from '../lib/prisma.js';
// get all folder what are available for current user
export default async function getFolders(req, res, next) {
    let folders;
    let profileId;
    if (req.user) {
        profileId = await prisma.profile.findFirst({
            where: { userId: req.user.id },
            select: { id: true },
        });
        if (profileId) {
            folders = await prisma.folder.findMany({
                where: {
                    profileId: profileId.id,
                },
            });
        }
    }
    req.folders = folders;
    next();
}
//# sourceMappingURL=getFolders.js.map