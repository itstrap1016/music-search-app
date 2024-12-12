### React

- 설명
  - React는 UI(사용자 인터페이스)를 빌드하기 위한 라이브러리입니다. 애플리케이션의 뷰 계층을 관리하고 구성요소 기반(Component-Based)의 개발 방식을 지원합니다.
- 주요 특징
  - 컴포넌트(Component) 기반: UI를 작고 독립적인 컴포넌트로 나누어 개발합니다.
  - JSX: JavaScript와 HTML을 결합한 문법으로, 읽기 쉽고 선언적인 코드 작성을 돕습니다.
  - Virtual DOM: DOM 업데이트를 효율적으로 처리하기 위해 React는 실제 DOM이 아닌 메모리에 있는 가상 DOM을 사용합니다.
  - 상태 및 Props 관리: React는 state와 props를 사용해 동적인 데이터와 컴포넌트 간 데이터를 관리합니다.
- 용도
  - React 라이브러리는 UI 컴포넌트를 정의하고, 논리를 작성하며, 상태를 관리하는 데 사용됩니다.
  - DOM에 직접 접근하지 않습니다. 대신 UI를 정의하고, 이를 React DOM에 넘겨 렌더링합니다.

### React DOM
- 설명
  - React DOM은 React에서 작성된 컴포넌트를 실제 브라우저 DOM에 렌더링하는 데 사용됩니다. React는 플랫폼 독립적이며, React DOM은 React를 웹 브라우저에서 실행하기 위한 특정 구현체입니다.
- 주요 역할
  - React 컴포넌트를 HTML 요소로 변환하여 브라우저의 DOM에 렌더링합니다.
  - React의 Virtual DOM과 실제 DOM 간의 동기화를 담당합니다.
  - React 컴포넌트를 브라우저 DOM에 붙이고 관리할 수 있는 다양한 API를 제공합니다.