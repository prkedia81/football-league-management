// 
import { Button } from "@/components/ui/button"
import { FormEvent, useState } from "react"
import { Winner } from "@/app/admin/match/finish-match/match-forms/winner"
import { playerList } from "@/app/admin/match/finish-match/match-forms/playerList"
// import { scoreLogic } from "./match-forms/scoreLogic"
import { matchMultistepForm } from "@/app/admin/match/finish-match/match-forms/matchMultiStep"

type FormData = {
    winner: string
    players_1: string[]
    players_2: string[]
    goals_1: number
    goals_2: number
    scorer: string[]
    yellow_card: number
    yellow_carder: string[]
    red_card: number
    red_carder: string[]
    official: string[]
  }
  
  const INITIAL_DATA: FormData = {
    winner: "",
    players_1: [],
    players_2: [],
    goals_1: 0,
    goals_2: 0,
    scorer: [],
    yellow_card: 0,
    yellow_carder: [],
    red_card: 0,
    red_carder: [],
    official: [],
  }

function MatchCompleteForm() {
    const [data, setData] = useState(INITIAL_DATA)
    function updateFields(fields: Partial<FormData>) {
      setData(prev => {
        return { ...prev, ...fields }
      })
    }
    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
      matchMultistepForm([
        <Winner {...data}  updateFields={updateFields} />,
        <playerList {...data}  updateFields={updateFields} />,
        // <scoreLogic {...data} updateFields={updateFields} />,
      ])
  
    function onSubmit(e: FormEvent) {
      e.preventDefault()
      if (!isLastStep) return next()
      alert("Match Data Submitted Successfully")
    }
  
    return (
      <div
        style={{
          position: "relative",
          background: "white",
          border: "1px solid black",
          padding: "2rem",
          margin: "1rem",
          borderRadius: ".5rem",
          fontFamily: "Arial",
          maxWidth: "max-content",
        }}
      >
        <form onSubmit={onSubmit}>
          <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
            {currentStepIndex + 1} / {steps.length}
          </div>
          {step}
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              gap: ".5rem",
              justifyContent: "flex-end",
            }}
          >
            {!isFirstStep && (
              <Button type="button" onClick={back}>
                Back
              </Button>
            )}
            <Button type="submit">{isLastStep ? "Submit" : "Next"}</Button>
          </div>
        </form>
      </div>
    )
  }

  export default MatchCompleteForm