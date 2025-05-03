import { IconCirclePlus, IconTarget } from "@tabler/icons-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Goal from "@/interfaces/Goal";

interface Props {
  onSubmit: (goal: Goal) => void;
}

const GoalForm = ({onSubmit}: Props) => {
  const typeEnums = ["Session", "Streak"] as const;

  const goalSchema = z
    .object({
      title: z
        .string({ message: "Please enter a title." })
        .min(1, { message: "Please enter a title." }),
      type: z.enum(typeEnums),
      sets: z
        .number({
          invalid_type_error:
            "Please enter how many sessions you plan to complete.",
        })
        .optional(),
      minutesPerSet: z
        .number({
          invalid_type_error:
            "Please specify how long each session should be (in minutes).",
        })
        .optional(),
      streakDays: z
        .number({
          invalid_type_error:
            "Please enter how many days the streak should be.",
        })
        .optional(),
      reward: z
        .string({ message: "Let us know what reward you’ll give yourself!" })
        .min(1, { message: "Let us know what reward you’ll give yourself!" }),
    })
    .superRefine((data, ctx) => {
      if (data.type === "Session") {
        if (data.sets == null) {
          ctx.addIssue({
            path: ["numberOfSessions"],
            code: z.ZodIssueCode.custom,
            message: "numberOfSets is required for Session goals",
          });
        }

        if (data.minutesPerSet == null) {
          ctx.addIssue({
            path: ["sessionDuration"],
            code: z.ZodIssueCode.custom,
            message: "sessionDuration is required for Session goals",
          });
        }
      }

      if (data.type === "Streak") {
        if (data.streakDays == null) {
          ctx.addIssue({
            path: ["streakDays"],
            code: z.ZodIssueCode.custom,
            message: "streakDays is required for Streak goals",
          });
        }
      }
    });

  type GoalData = z.infer<typeof goalSchema>;

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GoalData>({
    resolver: zodResolver(goalSchema),
    defaultValues: { type: "Session" },
  });

  const selectedType = watch("type");

  const handleTypeChange = (type: (typeof typeEnums)[number]) => {
    reset();
    setValue("type", type);
  };

  return (
    <div className="bg-neutral-900/60 backdrop-blur-md p-6 rounded-2xl shadow-lg mb-20 border border-neutral-800">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <IconTarget className="w-5 h-5 text-neutral-400" />
        Set a New Goal
      </h2>

      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          onSubmit(data as Goal);
          reset();
        })}
        className="grid gap-5"
      >
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="text-sm font-medium text-white mb-1 block"
          >
            Goal Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="e.g., Learn Italian"
            {...register("title")}
            className="w-full p-3 bg-neutral-800 text-sm rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
          />
          {errors.title && (
            <p className="text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Goal Type Selector */}
        <div>
          <label className="text-sm font-medium text-white mb-1 block">
            Goal Type
          </label>
          <div className="flex items-center gap-3">
            {typeEnums.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleTypeChange(type)}
                className={`hover:cursor-pointer  px-4 py-1 rounded-full text-sm transition-colors ${
                  selectedType === type
                    ? "bg-green-600 text-white "
                    : "bg-neutral-700 text-gray-300 hover:bg-neutral-600"
                }`}
              >
                {type}
              </button>
            ))}

            {errors.type && (
              <p className="text-red-600">{errors.type.message}</p>
            )}
          </div>
        </div>

        {/* Conditional Inputs */}
        {selectedType === "Session" && (
          <>
            <div>
              <label className="text-sm font-medium text-white mb-1 block">
                Number of Sessions
              </label>
              <input
                type="number"
                {...register("sets", { valueAsNumber: true })}
                placeholder="e.g., 5"
                className="w-full p-3 bg-neutral-800 text-sm rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
              />

              {errors.sets && (
                <p className="text-red-600">
                  {errors.sets.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-white mb-1 block">
                Session Duration (mins)
              </label>
              <input
                type="number"
                placeholder="e.g., 60"
                {...register("minutesPerSet", { valueAsNumber: true })}
                className="w-full p-3 bg-neutral-800 text-sm rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
              />

              {errors.minutesPerSet && (
                <p className="text-red-600">{errors.minutesPerSet.message}</p>
              )}
            </div>
          </>
        )}

        {selectedType === "Streak" && (
          <div>
            <label className="text-sm font-medium text-white mb-1 block">
              Days in a Row
            </label>
            <input
              type="number"
              placeholder="e.g., 7"
              {...register("streakDays", { valueAsNumber: true })}
              className="w-full p-3 bg-neutral-800 text-sm rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
            />

            {errors.streakDays && (
              <p className="text-red-600">{errors.streakDays.message}</p>
            )}
          </div>
        )}

        {/* Reward */}
        <div>
          <label className="text-sm font-medium text-white mb-1 block">
            Reward
          </label>
          <input
            type="text"
            placeholder="e.g., Ice cream 🍦"
            {...register("reward")}
            className="w-full p-3 bg-neutral-800 text-sm rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
          />

          {errors.reward && (
            <p className="text-red-600">{errors.reward.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-4 py-3 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 hover:cursor-pointer text-white text-sm font-medium rounded-lg transition-all"
        >
          <IconCirclePlus className="w-4 h-4" />
          Add Goal
        </button>
      </form>
    </div>
  );
};

export default GoalForm;
