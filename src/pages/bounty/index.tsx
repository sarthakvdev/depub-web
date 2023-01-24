import FlexCol from 'components/wrappers/FlexCol';
import { useCountdown } from 'components/Timer';
import Container from 'components/wrappers/Container';

const BountyPage = () => {
  const [days, hours, minutes, seconds] = useCountdown(
    'January 27 2023 09:00:00'
  );
  return (
    <Container>
      <FlexCol className="gap-y-6">
        <p className="text-4xl font-semibold">Bounty unlock Period</p>
        <ShowCounter
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      </FlexCol>
    </Container>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }: any) => {
  return (
    <div className="show-counter flex flex-row text-2xl">
      <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
      <p>:</p>
      <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
    </div>
  );
};

const DateTimeDisplay = ({ value, type, isDanger }: any) => {
  return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};

export default BountyPage;
