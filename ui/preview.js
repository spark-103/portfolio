// 미리보기의 동작만 연결하며 입력 데이터를 저장하거나 전송하지 않는다.
const feedback = document.querySelector('#action-feedback');
const notify = (message, tone = 'success') => {
  feedback.setAttribute('tone', tone);
  feedback.setAttribute('message', message);
};
document.querySelector('#primary-demo').addEventListener('click', () => notify('주요 버튼을 눌렀습니다. 실제 화면에서는 대표 작업으로 연결합니다.'));
document.querySelector('#secondary-demo').addEventListener('click', () => notify('보조 버튼을 눌렀습니다.'));
document.querySelector('#danger-demo').addEventListener('click', () => notify('삭제 버튼의 디자인 예시입니다. 삭제된 데이터는 없습니다.', 'warning'));
document.querySelector('#loading-demo').addEventListener('click', event => {
  const button = event.currentTarget;
  button.setAttribute('loading', '');
  notify('처리 중 상태를 보여드리고 있습니다.', 'info');
  setTimeout(() => {
    button.removeAttribute('loading');
    notify('처리 중 상태 체험이 끝났습니다.');
  }, 1200);
});
const form = document.querySelector('#demo-form');
const formFeedback = document.querySelector('#form-feedback');
form.addEventListener('submit', event => {
  event.preventDefault();
  let firstInvalid;
  form.querySelectorAll('form-field').forEach(field => {
    const input = field.control;
    const emptyRequired = input.required && !input.value.trim();
    const message = emptyRequired ? '필수 항목을 입력해주세요.' : !input.validity.valid ? '올바른 이메일 형식으로 입력해주세요.' : '';
    field.setError(message);
    if (message && !firstInvalid) firstInvalid = input;
  });
  formFeedback.setAttribute('tone', firstInvalid ? 'danger' : 'success');
  formFeedback.setAttribute('message', firstInvalid ? '입력 내용을 확인해주세요.' : '입력 형식을 확인했습니다. 실제 저장·전송은 하지 않았습니다.');
  firstInvalid?.focus();
});
form.addEventListener('input', event => event.target.closest('form-field')?.setError(''));
document.querySelector('#reset-demo').addEventListener('click', () => {
  form.reset();
  form.querySelectorAll('form-field').forEach(field => field.setError(''));
  formFeedback.setAttribute('tone', 'info');
  formFeedback.setAttribute('message', '입력을 초기 상태로 되돌렸습니다.');
});
