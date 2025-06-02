import { useAuthStore } from "@/context/useAuthStore";
import { useGoalStore } from "@/hooks/useGoalStore";
import Goal, { typeEnums } from "@/interfaces/Goal";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconCirclePlus, IconTarget } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const GoalForm = () => {
  const user = useAuthStore((s) => s.user);

  const addGoal = useGoalStore((s) => s.addGoal);
  const goalsLength = useGoalStore((s) => s.goals).length;

  const goalSchema = z
    .object({
      name: z
        .string({ message: "Please enter a title." })
        .min(1, { message: "Please enter a title." }),
      type: z.enum(typeEnums),
      sets: z
        .number({
          invalid_type_error:
            "Please enter how many sessions you plan to complete.",
        })
        .optional(),
      duration: z
        .number({
          invalid_type_error:
            "Please specify how long each session should be (in minutes).",
        })
        .optional(),
      days: z
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
      if (data.type === "SESSION") {
        if (data.sets == null) {
          ctx.addIssue({
            path: ["sets"],
            code: z.ZodIssueCode.custom,
            message: "Sets is required for Session goals",
          });
        }

        if (data.duration == null) {
          ctx.addIssue({
            path: ["duration"],
            code: z.ZodIssueCode.custom,
            message: "duration is required for Session goals",
          });
        }
      }

      if (data.type === "STREAK") {
        if (data.days == null) {
          ctx.addIssue({
            path: ["days"],
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
    setError,
    formState: { errors },
  } = useForm<GoalData>({
    resolver: zodResolver(goalSchema),
    defaultValues: { type: "SESSION" },
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
        onSubmit={handleSubmit(async (data) => {
          if (user) {
            try {
              await addGoal(data as Goal, user.id);
              reset();
            } catch (err) {
              setError("root", {
                message: "There was an error with adding a new goal. Please try again!",
              });
            }
          }
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
            {...register("name")}
            className="w-full p-3 bg-neutral-800 text-sm rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
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
                    ? "bg-green-600 text-white font-bold"
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
        {selectedType === "SESSION" && (
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
                <p className="text-red-600">{errors.sets.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-white mb-1 block">
                Session Duration (mins)
              </label>
              <input
                type="number"
                placeholder="e.g., 60"
                {...register("duration", { valueAsNumber: true })}
                className="w-full p-3 bg-neutral-800 text-sm rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
              />

              {errors.duration && (
                <p className="text-red-600">{errors.duration.message}</p>
              )}
            </div>
          </>
        )}

        {selectedType === "STREAK" && (
          <div>
            <label className="text-sm font-medium text-white mb-1 block">
              Days in a Row
            </label>
            <input
              type="number"
              placeholder="e.g., 7"
              {...register("days", { valueAsNumber: true })}
              className="w-full p-3 bg-neutral-800 text-sm rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
            />

            {errors.days && (
              <p className="text-red-600">{errors.days.message}</p>
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
          disabled={goalsLength >= 5}
          className="w-full mt-4 py-3 flex items-center justify-center gap-2
          bg-green-600 hover:bg-green-500 hover:cursor-pointer text-white
          text-sm font-medium rounded-lg transition-all disabled:bg-red-600 disabled:hover:cursor-default"
        >
          {goalsLength >= 5 ? (
            <p>You can't add more goals</p>
          ) : (
            <>
              <IconCirclePlus className="w-4 h-4" />
              Add Goal
            </>
          )}
        </button>
        {errors.root && <p className="text-red-600">{errors.root.message}</p>}
      </form>
    </div>
  );
};

export default GoalForm;
