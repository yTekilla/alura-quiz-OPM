/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widgets';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';
import { getDisplayName } from 'next/dist/next-server/lib/utils';

export const QuizHeader = styled.div`

`;

function LoadingWidget() {
  return( 
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({question, totalQuestions, questionIndex,onSubmit}) {
const [selectedAlternative, setSelectedAlternative] = React.useState(undefined); {/* Estado dos botões das questões*/}

  const questionId = `question__${questionIndex}`;
return ( 
  <Widget >
  <Widget.Header >
    <h3>
    {`Pergunta ${questionIndex+1} de ${totalQuestions}`}
    </h3>
  </Widget.Header>
  <img 
  alt="Descrição"
  style={{
    width: '100%',
    height: '150px',
    objectFit: 'cover,'
  }}
  src={question.image}
  />
    <Widget.Content>
     <h2>
       {question.title}
     </h2>
     <p>
      {question.description}
     </p>
      <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
      }}>
       
       
      {question.alternatives.map((alternative,alternativeIndex) => {
        const alternativeId = `alternative__${alternativeIndex}`;
        return (
          <Widget.Topic
          as="label"
          key={alternativeId}
          onChange={() => setSelectedAlternative(alternativeId)}      //Quando houver uma mudança haverá um alteração no estado (Quando um dos botões está selecionado).
          htmlFor={alternativeId}
          >
           
            <input /*style={{display: 'none'} }*/ id={alternativeId}
            name={questionId}
            type="radio"/>
             {alternative} 
          </Widget.Topic>
        );

      })}
      {/*
       <pre>
       {JSON.stringify(question, null,4)}
       </pre>
      */}

     <Button type="submit">
       Confirmar
     </Button>
     </form>
    </Widget.Content>
</Widget>
 );
}

const screenStates ={
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
  export default function QuizPage() {
  const [screenState, setScreecState] = React.useState(screenStates.LOADING);
  const router = useRouter();
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion  ] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  React.useEffect(() => {
    setTimeout(() => {
      setScreecState(screenStates.QUIZ);
    }, 1 * 1000);

  }, []);

function handleSubmit() {
  const nextQuestion = questionIndex + 1;
  if(nextQuestion < totalQuestions){
  setCurrentQuestion(questionIndex +1);

  }else{
    setScreecState(screenStates.RESULT);
  }
  
}
  
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Quiz ワンパンマン</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
       {screenState === screenStates.QUIZ && ( 
      <QuestionWidget 
       question={question}
       totalQuestions={totalQuestions}
       questionIndex={questionIndex}
       onSubmit={handleSubmit}
       />
       )}
        { screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <div>Você acertou X questões</div>}
      </QuizContainer>
    </QuizBackground>
  );
}
 