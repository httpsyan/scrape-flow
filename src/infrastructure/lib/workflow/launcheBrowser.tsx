import { TaskParamType, TaskType } from "@/src/domain";
import { GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) => (
    <GlobeIcon className="stroke-pink-400" {...props} />
  ),
  isEntryPoint: true,
  inputs: [
    {
      name: "Url",
      type: TaskParamType.STRING,
      label: "URL",
      required: true,
      hideHandle: true,
      helperText: "eg: https://www.google.com",
    },
  ],
};
