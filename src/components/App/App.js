import { useState } from 'react';
import FeedbackOptions from 'components/FeedbackOptions';
import Statistics from 'components/Statistics';
import Section from 'components/Section';
import Notification from 'components/Notification';
import { Container } from './App.styled';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleChange = option => {
    switch (option) {
      case 'good':
        setGood(prevAmount => prevAmount + 1)
        break;
      
      case 'neutral':
        setNeutral(prevAmount => prevAmount + 1)
        break;
      
      case 'bad':
        setBad(prevAmount => prevAmount + 1)
        break;
      
      default:
        return;
    }
  }

  const countTotalFeedback = () => (good + neutral + bad)

  function countPositiveFeedbackPercentage() {
    const positiveFeedbackPercentage = `${Math.round(
        (good * 100) / countTotalFeedback())}%`
    
    return(good ? positiveFeedbackPercentage : '0')
  }
    const options = ['good', 'neutral', 'bad'];

    return (
      <Container>
        <Section title="Please leave feedback">
          <FeedbackOptions options={options} onLeaveFeedback={handleChange} />
        </Section>

        <Section title="Statistics">
          {countTotalFeedback() ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </Container>
    );
}

export default App;
