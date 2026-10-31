# 포트폴리오 UI 컴포넌트

`../design-guide.md`를 기준으로 만든 표준 웹 컴포넌트입니다. 별도 라이브러리·설치·빌드 과정 없이 최신 브라우저에서 실행됩니다. React 전용 컴포넌트가 아니라 HTML 커스텀 요소로 구성되어 여러 화면에서 재사용할 수 있습니다.

## 미리보기

`index.html`을 브라우저로 열면 됩니다. 파일을 직접 열어도 동작하도록 일반 지연 실행 스크립트를 사용했습니다. 모바일 메뉴, 버튼 상태 체험, 입력 검증과 초기화를 제공합니다. 실제 관리자 인증·데이터 저장·업로드는 포함하지 않습니다.

## 파일 구조

```text
ui/
  index.html
  preview.js
  styles/
    tokens.css
    components.css
  components/
    utils.js
    portfolio-button.js
    status-badge.js
    education-strip.js
    empty-state.js
    work-card.js
    learning-card.js
    form-field.js
    ui-alert.js
    site-header.js
    site-footer.js
```

## 적용 순서

1. `tokens.css`, `components.css`를 불러옵니다.
2. `utils.js`를 먼저 불러옵니다.
3. 사용할 컴포넌트를 `defer` 스크립트로 불러옵니다. `education-strip`, `work-card`, `learning-card`는 `status-badge.js`도 함께 필요합니다.
4. HTML에 아래 태그를 작성합니다. 경로는 사용하는 페이지 위치에 맞게 수정합니다.

```html
<link rel="stylesheet" href="styles/tokens.css">
<link rel="stylesheet" href="styles/components.css">
<script defer src="components/utils.js"></script>
<script defer src="components/portfolio-button.js"></script>

<portfolio-button href="/works" icon="arrow">작업물 보기</portfolio-button>
```

## 컴포넌트 사용법

| 태그 | 주요 속성 | 설명 |
| --- | --- | --- |
| `portfolio-button` | `variant`, `size`, `href`, `type`, `icon`, `disabled`, `loading` | 주요·보조·텍스트·위험 버튼. `href`가 있으면 링크 |
| `status-badge` | `tone` | 글자로 전달하는 상태 |
| `education-strip` | `program`, `completed`, `ongoing` | 교육명과 두 과정의 상태 |
| `empty-state` | `heading`, `description`, `icon` | 자료가 없을 때의 화면 |
| `work-card` | `heading`, `summary`, `kind`, `state`, `tags`, `href`, `cover`, `cover-alt` | 작업물 카드. 태그는 쉼표로 구분 |
| `learning-card` | `heading`, `summary`, `course`, `date`, `stage`, `href` | 학습 기록 카드 |
| `form-field` | `label`, `name`, `type`, `value`, `placeholder`, `hint`, `error`, `required`, `disabled`, `multiline` | 이름표·도움말·오류를 포함한 입력창 |
| `ui-alert` | `tone`, `message` | 안내·오류·저장 결과 |
| `site-header` | `name`, `home-href`, `about-href`, `works-href`, `learning-href`, `works-label`, `learning-label` | 모바일 메뉴와 상단 이동 |
| `site-footer` | `email`, `resume` | 값이 있을 때만 연락·이력서 표시 |

`variant`: `primary`(기본), `secondary`, `text`, `danger`.

`size`: `small`(44px), 기본(48px), `large`(52px).

`tone`: `neutral`(배지 기본), `info`(알림 기본), `success`, `warning`, `danger`.

`icon`: `leaf`, `arrow`, `book`, `folder`, `cap`, `menu`, `check`, `info`, `close`.

```html
<portfolio-button variant="secondary" size="large">이력서 보기</portfolio-button>
<status-badge tone="success">초급 수료</status-badge>
<education-strip program="고양시민 기후테크 아카데미"></education-strip>
<empty-state icon="book" heading="학습 기록을 정리하고 있습니다." description="배운 내용을 차근차근 기록하겠습니다."></empty-state>
<work-card heading="실제 작업물 제목" summary="직접 수행한 내용" tags="코딩,데이터 관리" href="/works/1"></work-card>
<form-field label="이메일" type="email" name="email" hint="공개할 주소만 입력해주세요."></form-field>
<ui-alert tone="info" message="내용을 확인해주세요."></ui-alert>
```

## 동적 변경과 폼 연동

- 버튼의 `loading`, `disabled` 속성과 알림의 `message`, `tone`은 변경 즉시 반영됩니다.
- 다른 속성은 초기 렌더링 시 읽습니다. 콘텐츠를 바꾸려면 새 요소를 만들어 교체합니다.
- 입력값은 `field.value`로 읽고 쓰며 오류는 `field.setError('설명')`으로 표시합니다.
- 입력창 내부의 기본 HTML 입력 요소가 실제 `<form>`에 연결됩니다. `name`을 지정하면 `new FormData(form)`에 포함됩니다.
- 제출 버튼은 `<portfolio-button type="submit">`으로 지정합니다.
- 의미 있는 표지 이미지에는 `cover-alt` 설명을 작성합니다.
- 카드에 `href`가 없으면 이동하지 않는 콘텐츠입니다. `href`가 있으면 카드 전체가 하나의 링크가 됩니다.
- 링크는 `http:`, `https:`, `mailto:`, `/`, `./`, `../`, `#`로 시작하는 주소를 허용합니다. 일반 상대 파일명은 `./상세.html`처럼 작성합니다.
- 외부 문자열은 HTML로 실행하지 않고 텍스트로 표시합니다. 서버 인증과 파일 권한 검사는 별도 구현이 필요합니다.

## 확장 기준

새 화면은 공통 토큰과 기존 컴포넌트를 우선 사용합니다. 공통 CSS는 전역 스타일이므로 기존 앱에 통합할 때 기본 요소 스타일과의 충돌을 확인합니다. 이 컴포넌트 라이브러리는 라이트 테마만 제공합니다.

## 검증 기록

- 전체 자바스크립트 파일의 문법과 HTML에서 참조한 CSS·스크립트 경로를 확인했습니다.
- 10개 컴포넌트 등록, 7개 표시용 컴포넌트의 기본 출력, 문자열 이스케이프, 허용·차단 링크 형식을 점검했습니다.
- 검증용 최소 DOM 모형을 사용한 확인이며 실제 브라우저 테스트를 대체하지 않습니다.
- 앱 내 브라우저가 보안 정책상 `file:` 주소를 차단해 화면·모바일 배치·클릭 동작의 실제 브라우저 검증은 수행하지 못했습니다. 사용자는 `index.html`을 본인 브라우저로 열어 확인할 수 있습니다.
