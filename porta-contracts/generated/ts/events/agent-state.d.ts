export interface AgentStateEvent {
  contract_name: "AgentStateEvent";
  schema_version: "1.0.0";
  event_id: string;
  machine_id: string;
  event_type: "agent.state";
  timestamp: string;
  ingestion_timestamp: string;
  payload: StateSnapshot;
}
export interface StateSnapshot {
  contract_name: "StateSnapshot";
  schema_version: "1.0.0";
  state_id: string;
  machine_id: string;
  state_name: "stable" | "elevated_risk" | "degrading" | "critical" | "recovering";
  probability: number;
  confidence: number;
  /**
   * @minItems 1
   * @maxItems 16
   */
  contributing_primitives:
    | [
        {
          name: string;
          weight: number;
          deviation: number;
        }
      ]
    | [
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        }
      ]
    | [
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        }
      ]
    | [
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        }
      ]
    | [
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        }
      ]
    | [
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        }
      ]
    | [
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        }
      ]
    | [
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        }
      ]
    | [
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        }
      ]
    | [
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        }
      ]
    | [
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        }
      ]
    | [
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        }
      ]
    | [
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        }
      ]
    | [
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        }
      ]
    | [
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        }
      ]
    | [
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        },
        {
          name: string;
          weight: number;
          deviation: number;
        }
      ];
  explanation: string;
  baseline_deviation_factor: number;
  evaluated_at: string;
  model_version: string;
}
