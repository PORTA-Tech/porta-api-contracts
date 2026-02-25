export interface AuditRecord {
  contract_name: "AuditRecord";
  schema_version: "1.0.0";
  audit_id: string;
  machine_id: string;
  correlation_id: string;
  /**
   * @minItems 1
   * @maxItems 512
   */
  event_chain: [string, ...string[]];
  evaluated_policy: string;
  resulting_state: "stable" | "elevated_risk" | "degrading" | "critical" | "recovering";
  issued_intervention: string;
  rbac_actor: string;
  decision_trace: {
    input_state_snapshot: StateSnapshot;
    /**
     * @minItems 1
     * @maxItems 64
     */
    policy_path: [string, ...string[]];
    escalation_level: number;
    outcome: "issued" | "suppressed" | "skipped" | "failed";
  };
  created_at: string;
  retention_class: "short_term" | "regulatory" | "security" | "permanent";
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
