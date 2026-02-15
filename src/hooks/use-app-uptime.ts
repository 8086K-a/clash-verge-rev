import useSWR from "swr";

import { getAppUptime } from "@/services/cmds";
import { SWR_DEFAULTS } from "@/services/config";

const UPTIME_POLL_INTERVAL_MS = 3000;

export const useAppUptime = () => {
  const { data, mutate, ...rest } = useSWR("appUptime", getAppUptime, {
    ...SWR_DEFAULTS,
    refreshInterval: UPTIME_POLL_INTERVAL_MS,
    errorRetryCount: 1,
  });

  return {
    uptime: data ?? 0,
    refreshUptime: mutate,
    ...rest,
  };
};
