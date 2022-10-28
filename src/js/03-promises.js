import Notiflix from 'notiflix';
const formData = document.querySelector('form');
formData.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  let delayData = Number(formData.elements.delay.value);
  const stepData = Number(formData.elements.step.value);
  const amountData = Number(formData.elements.amount.value);

  e.target.reset();
  for (let amount = 0; amount < amountData; amount += 1)
    createPromise(amount + 1, (delayData += stepData))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          npm`❌ Rejected promise ${position} in ${delay}ms`
        );
      });

  function createPromise(position, delay) {
    const promise = new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, (delay -= stepData));
    });

    return promise;
  }
}
