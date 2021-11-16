import LogHelper from 'src/shared/helpers/log.helper';

export default async function seed(svc: any, data: any, name: string) {
  if ((await svc.count()) > 0) {
    LogHelper.warn(`Skipping ${name} seed since the table is not empty!`);
    return;
  }
  LogHelper.info(`Seeding ${name}...`);
  for (const d of data) {
    try {
      await svc.insert(d as any);
    } catch (ex) {
      throw ex;
    }
  }
  LogHelper.success(`Seeded ${name}!`);
}
