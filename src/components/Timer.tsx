import { useState, useRef, useEffect } from 'react';

const useCountdown = (targetDate: any) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: any) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export { useCountdown };

// const Timer = () => {
//   // let interval = useRef();
//   const countdownDate = new Date("January 26 2023 7:00:00").getTime();

//   const [countDown, setCountDown] = useState(
//     countdownDate - new Date().getTime()
//   );

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCountDown(countdownDate - new Date().getTime());
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [countdownDate]);

//   // The state for our timer
//   const [timerDays, setTimerDays] = useState('00');
//   const [timerHours, setTimerHours] = useState('00');
//   const [timerMinutes, setTimerMinutes] = useState('00');

//   const startTimer = () => {
//     const countdownDate = new Date('January 26 2023 7:00:00').getTime();

//     interval = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = countdownDate - now;

//       const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       const hours = Math.floor(
//         (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//       );
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

//       if (distance < 0) {
//         // stops timer
//         clearInterval(interval.current);
//       } else {
//         // update timer
//         setTimerDays(String(days));
//         setTimerHours(String(hours));
//         setTimerMinutes(String(minutes));
//       }
//     }, 1000);
//   };

//   useEffect(() => {
//     startTimer();
//     return () => {
//       clearInterval(interval.current);
//     };
//   }, []);

//   return (
//     <div className="text-2xl md:text-2xl lg:text-4xl xl:text-5xl font-extrabold flex flex-row tracking-wide flex-wrap">
//       <h2 className="mr-5">
//         {timerDays} <span className="opacity-50">days</span>,
//       </h2>
//       <h2 className="mr-5">
//         {timerHours} <span className="opacity-50">hours</span>,
//       </h2>
//       <h2>
//         {timerMinutes} <span className="opacity-50">mins</span> left
//       </h2>
//     </div>
//   );
// };

// export default Timer;
