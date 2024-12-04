'use client';

import React, {useState} from 'react';
import {Container} from "@mui/material";
import CustomSlide from "@/components/common/CustomSlide";
import PersonSelector from "@/components/common/PersonSelector";
import StoryFinal from "@/components/story/StoryFinal";
import {smoothOutput} from "@/constanst/helpers";

// const link = 'http://localhost:8080';
const link ='https://squid-app-ckcq2.ondigitalocean.app'

// Select person
// select Offer
// get result

const CreateStory = () => {
  const [person, setPerson] = useState("");
  const [story, setStory] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [steps, setSteps] = useState(0);
  const [loading, setLoading] = useState(null);
  const [model, setModel] = useState('gpt');


  // Yea, I know it's ugly ))))

  async function getStream(data, onData) {
    // try {
    let headers = {
      'Content-Type': 'application/json',
    };

    let response = await fetch(`${link}/tests/stream`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({...data})
    });

    if (!response.ok) {
        console.error('Network response was not ok');
    }

    // Чтение потока
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let done = false;
    let accumulatedText = '';

    while (!done) {
      const {value, done: doneReading} = await reader.read();
      done = doneReading;

      if (value) {
        const chunk = decoder.decode(value, {stream: true});
        accumulatedText += chunk;

        // Плавная задержка перед обновлением UI
        if (onData && typeof onData === 'function') {
          await smoothOutput(chunk, onData);
        }
      }
    }
  }

  const getResult = async () => {
    setLoading(true);
    const starterString = person
      ? `Name: ${person?.Name};\nAge: ${person?.Age};\nGender: ${person?.Gender};\nPlace of residence: ${person?.["Place of residence"]};\nJob title: ${person?.["Job title"]};\n`
      : "";
    const personData = selectedValues.reduce((acc, curr) => acc + `${curr}: ${person?.[curr]};\n`, starterString);

    console.log({personData});

    const prompt = `Please generate short review of this person: ${personData}`

    const data = {prompt, model};
    try {
      await getStream(data, (chunk) => {
        setStory((prev) => prev + chunk);
      });
      setLoading(false);
    } catch (e) {
      console.log("error: ", e);
      setLoading(false);
    }
    setLoading(false);
  };


  return (
    <Container>
      <CustomSlide condition={steps === 0}>
        <PersonSelector
          {...{
            person,
            setPerson,
            selectedValues,
            setSelectedValues,
            steps,
            setSteps,
            getResult
          }} />
      </CustomSlide>
      <CustomSlide condition={steps === 1}>
        <StoryFinal {...{steps, setSteps, loading, story, setStory, person, setLoading}}/>
      </CustomSlide>
    </Container>
  );
};

export default CreateStory;
