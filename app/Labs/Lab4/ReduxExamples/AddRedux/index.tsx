"use client";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { add } from "./addReducer";
import { FormControl, Button } from "react-bootstrap";

interface RootState {
  addReducer: { sum: number };
}

export default function AddRedux() {
  const [a, setA] = useState<number>(12);
  const [b, setB] = useState<number>(23);

  const { sum } = useSelector((state: RootState) => state.addReducer);
  const dispatch = useDispatch();

  return (
    <div className="w-25" id="wd-add-redux">
      <h1>Add Redux</h1>
      <h2>
        {a} + {b} = {sum}
      </h2>

      <FormControl
        type="number"
        defaultValue={a}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setA(parseInt(e.target.value))
        }
        className="mb-2"
      />

      <FormControl
        type="number"
        defaultValue={b}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setB(parseInt(e.target.value))
        }
        className="mb-2"
      />

      <Button id="wd-add-redux-click" onClick={() => dispatch(add({ a, b }))}>
        Add Redux
      </Button>

      <hr />
    </div>
  );
}
