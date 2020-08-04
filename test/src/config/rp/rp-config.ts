import { allConfigs } from '../all-configs'
import CliUtils from '../../utils/cli-utils'

export const ReportPortalConfig = {
  endpoint: 'http://localhost:8888/api/v2',
  token: 'ba8ce8e2-4fe7-451a-80f1-2e497821ae77',
  launch: `BB-CHOOSE-${CliUtils.getRunner().toUpperCase()}`,
  project: 'default_personal',
  description: JSON.stringify(allConfigs.capsConfig),
}
