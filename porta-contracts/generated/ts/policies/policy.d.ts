/**
 * This interface was referenced by `RegulationPolicy`'s JSON-Schema
 * via the `definition` "stateEnum".
 */
export type StateEnum = "stable" | "elevated_risk" | "degrading" | "critical" | "recovering";

export interface RegulationPolicy {
  contract_name: "RegulationPolicy";
  schema_version: "2.0.0";
  policy_model_version: "deterministic-policy-v1.0.0";
  policy_id: string;
  policy_name: string;
  version: string;
  created_by: string;
  created_at: string;
  /**
   * @minItems 1
   * @maxItems 5
   */
  target_states:
    | [StateEnum]
    | [StateEnum, StateEnum]
    | [StateEnum, StateEnum, StateEnum]
    | [StateEnum, StateEnum, StateEnum, StateEnum]
    | [StateEnum, StateEnum, StateEnum, StateEnum, StateEnum];
  severity_min: number;
  severity_max: number;
  machine_selector?:
    | {
        type: "all";
      }
    | {
        type: "machine_ids";
        /**
         * @maxItems 10000
         */
        machine_ids: string[];
      }
    | {
        type: "tags";
        /**
         * @maxItems 256
         */
        tags: string[];
      };
  conditions: ConditionNode;
  stability_overrides?: {
    min_dwell_seconds?: number;
    min_cooldown_seconds?: number;
    min_sustained_probability?: number;
  };
  /**
   * @minItems 1
   * @maxItems 16
   */
  interventions:
    | [
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        }
      ]
    | [
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        }
      ]
    | [
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        }
      ]
    | [
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        }
      ]
    | [
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        }
      ]
    | [
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        }
      ]
    | [
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        }
      ]
    | [
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        }
      ]
    | [
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        }
      ]
    | [
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        }
      ]
    | [
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        }
      ]
    | [
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        }
      ]
    | [
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        }
      ]
    | [
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        }
      ]
    | [
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        }
      ]
    | [
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        },
        {
          intervention_type: "notify" | "throttle" | "pause_capture" | "require_ack";
          parameters: {
            [k: string]: string | number | boolean;
          };
          priority: number;
          max_frequency: "PT10S" | "PT30S" | "PT1M" | "PT5M" | "PT15M" | "PT1H";
          requires_human_confirmation: boolean;
        }
      ];
  signature: {
    algorithm: "Ed25519";
    signing_key_id: string;
    signature: string;
    created_at: string;
  };
}
/**
 * This interface was referenced by `RegulationPolicy`'s JSON-Schema
 * via the `definition` "conditionNode".
 */
export interface ConditionNode {
  operator: "AND" | "OR" | "NOT";
  /**
   * @minItems 1
   * @maxItems 32
   */
  conditions: [ConditionLeaf | ConditionNode, ...(ConditionLeaf | ConditionNode)[]];
}
/**
 * This interface was referenced by `RegulationPolicy`'s JSON-Schema
 * via the `definition` "conditionLeaf".
 */
export interface ConditionLeaf {
  field: "state_name" | "probability" | "confidence" | "global_risk_score" | "risk_delta" | "trend_direction";
  op: "==" | "!=" | "<" | "<=" | ">" | ">=";
  value: number | string | boolean;
}
