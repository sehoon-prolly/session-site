import { useState } from 'react'
import './App.css'

const heroTags = [
  'VS Code 설치',
  'Codex 시작',
  '대화 사례',
  '프롬프트 팁',
  '체크리스트',
  '접히는 블럭',
]

const agendaItems = [
  {
    label: '핵심 1',
    title: '처음엔 완벽한 프롬프트보다\n작은 성공 하나가 더 중요해요',
  },
  {
    label: '핵심 2',
    title: '원하는 화면을 말하면\nCodex가 초안을 빠르게 만들어줄 수 있어요',
  },
  {
    label: '핵심 3',
    title: '처음 결과를 보고\n수정 요청으로 다듬어가면 됩니다',
  },
]

const setupSteps = [
  '공식 다운로드 페이지에서 내 컴퓨터 운영체제에 맞는 설치 파일을 받아 실행합니다. 설치 과정은 보통 기본값으로 계속 진행해도 괜찮습니다.',
  'VS Code를 켜면 왼쪽에 세로로 아이콘들이 보입니다. 파일 모양은 파일 보기, 돋보기는 검색, 네모 4개 모양은 확장 기능 설치 메뉴라고 생각하면 됩니다.',
  '왼쪽의 네모 4개 모양 아이콘을 눌러 확장 기능 메뉴를 열고 Korean Language Pack for Visual Studio Code를 검색해 설치합니다. 설치 뒤 다시 시작하라는 안내가 뜨면 재시작하면 됩니다.',
  '이제 File > Open Folder 메뉴로 들어가 새 폴더나 준비된 폴더를 엽니다. 쉽게 말해 내가 만들 파일들을 넣어둘 작업방을 정하는 단계입니다.',
  '다시 확장 기능 메뉴에서 Codex를 검색해 설치합니다. 설치가 끝나면 왼쪽이나 사이드 패널에 Codex 관련 메뉴가 보입니다.',
  'Codex를 처음 열면 로그인 화면이 나옵니다. 보통은 ChatGPT 계정으로 로그인하는 방식이 가장 이해하기 쉽고, 필요하면 API 키 방식도 사용할 수 있습니다.',
  '처음에는 어려운 말을 길게 쓰기보다 무엇을 만들고 싶은지, 누가 볼 건지, 어떤 느낌이면 좋은지, 꼭 들어갈 요소가 무엇인지 정도만 적어도 충분합니다.',
  'CLI도 함께 보여주고 싶다면 터미널에서는 npm i -g @openai/codex 후 codex로 시작할 수 있습니다.',
]

const setupChecklist = [
  'VS Code를 설치했다',
  '처음 화면에서 메뉴 위치를 확인했다',
  '한글 언어 팩을 설치했다',
  '새 작업 폴더를 열었다',
  '확장에서 Codex를 설치했다',
  'ChatGPT 또는 API 키로 로그인했다',
  '첫 프롬프트를 보냈다',
  '필요하면 CLI 실행도 확인했다',
]

const setupQuiz = [
  {
    question: 'Q1. 처음 영어 화면이 어렵다면 가장 먼저 하면 좋은 일은?',
    answer: '정답: Korean Language Pack을 설치해 한글로 바꾸는 것입니다.',
  },
  {
    question: 'Q2. 확장 기능은 어디에서 설치하나요?',
    answer: '정답: 왼쪽의 네모 4개 모양 아이콘 메뉴입니다.',
  },
  {
    question: 'Q3. 첫 프롬프트에 꼭 넣으면 좋은 4가지는?',
    answer: '정답: 목표, 맥락, 제약, 완료 기준입니다.',
  },
]

const logEntries = [
  {
    block: '대화 블럭 01',
    title: '수업용 안내 페이지 초안 만들기',
    request: [
      'VS Code 설치법, Codex 세팅, 프롬프트 팁을 담은 웹사이트 만들기',
      '카테고리는 3개로 나누고 초보자도 바로 볼 수 있게 구성하기',
      '굴림체와 black & white 분위기를 유지하기',
      '각 카테고리에 체크리스트와 퀴즈를 넣기',
    ],
    implementation: [
      '세 카테고리를 가진 한 페이지 사이트 구조 생성',
      '흑백 계열 카드 레이아웃과 그림자 효과 적용',
      '체크리스트 진행률, 전체 진도 표시, 접히는 퀴즈 구현',
      '프롬프트 예시 복사 기능과 참고 링크 추가',
    ],
  },
  {
    block: '대화 블럭 02',
    title: '대화 내용은 핵심만 남기도록 정리 방식 수정',
    request: [
      '전체 대화 전문 대신 요약 위주로 정리하기',
      '요약 형식은 요청사항 / 구현사항 중심으로 맞추기',
      '페이지 실행 방법도 함께 적어두기',
    ],
    implementation: [
      '2번 카테고리의 요약 구성을 핵심 항목 중심으로 재작성',
      '설치 섹션에 페이지 실행 방법과 로컬 서버 명령 예시 추가',
      '앞으로 내용이 늘어나도 이어 붙이기 쉬운 형태로 정리',
    ],
  },
  {
    block: '대화 블럭 03',
    title: '사례 구역을 더 깔끔하게 보이도록 다시 정리',
    request: [
      '2번 카테고리의 퀴즈는 제거하기',
      '대화 내용은 새 블럭으로 나누고 열고 닫을 수 있게 만들기',
      '설명이 지나치게 전지적인 느낌이 들지 않도록 문구 수정하기',
      '3번 카테고리는 특정 사례가 아닌 일반적인 실습 팁으로 바꾸기',
    ],
    implementation: [
      '2번 카테고리를 요청-구현 사례 블럭 모음 형태로 재구성',
      '각 블럭을 접고 펼칠 수 있게 정리',
      '2번 설명을 Codex로 무엇을 구현할 수 있는가 중심으로 변경',
      '3번 카테고리의 문구와 예시를 범용 실습용으로 다시 작성',
    ],
  },
  {
    block: '대화 블럭 04',
    title: '토글을 실제로 작동하게 하고 초보자 설명을 더 쉽게 수정',
    request: [
      '퀴즈 토글이 실제로 열리고 닫히게 만들기',
      '1번 카테고리 설명을 더 쉬운 단어로 풀어쓰기',
      'VS Code가 처음 영어로 보일 때를 대비해 한글 확장 설치 방법 추가하기',
      'Codex 확장 설치 흐름도 초보자 눈높이에서 다시 설명하기',
    ],
    implementation: [
      '퀴즈와 사례 블럭 토글을 브라우저 기본 접기 기능으로 재구성',
      '설치 설명을 아주 처음 쓰는 사람 기준의 순서로 다시 작성',
      '한글 언어 팩 설치 방법과 링크를 추가',
      '헷갈리기 쉬운 단어 설명과 추천 시작 순서를 별도 블럭으로 추가',
    ],
  },
  {
    block: '대화 블럭 05',
    title: '실행 안내를 수업용 문구에 맞게 더 자연스럽게 수정',
    request: [
      '지금 이 페이지를 실행할 때 쓴 실제 경로 대신 일반적인 예시를 쓰기',
      '터미널에 어떤 명령을 입력해야 하는지도 Codex가 알려줄 수 있다는 점을 설명하기',
      '수업 현장에서 그대로 읽어도 어색하지 않은 안내 문구로 정리하기',
    ],
    implementation: [
      '실행 예시를 cd my-project-folder 형태로 일반화',
      '명령어 자체도 Codex에게 물어보면 바로 안내받을 수 있다는 설명 추가',
      '로컬 서버 실행 예시를 프로젝트 공통 안내 문구로 재작성',
    ],
  },
  {
    block: '대화 블럭 06',
    title: 'React 버전을 따로 만들고 정적 버전과 구조를 분리',
    request: [
      '오늘 바로 보여줄 사이트는 유지하되 React 버전도 별도 포트에서 보고 싶기',
      '정적 버전과 React 버전이 파일 구조상 명확히 구분되길 원함',
      '어느 시점 이후 빠진 대화 내용도 두 페이지 모두에 반영되길 원함',
    ],
    implementation: [
      'React 버전을 별도 앱으로 구성하고 독립 포트에서 실행 가능하게 준비',
      '정적 버전과 React 버전의 파일 구조를 분리해 혼동을 줄이도록 재배치',
      '2번 카테고리 사례 블럭을 최신 대화 내용까지 양쪽 버전에 모두 반영',
    ],
  },
  {
    block: '대화 블럭 07',
    title: '이 사이트에서 언제 React가 더 유리한지 설명하고 대화 반영 계속 유지',
    request: [
      '정적 페이지와 React 페이지의 차이와 장점을 이 사이트 기준으로 더 설명해주기',
      '어떤 시점부터 React가 더 유리해지는지 실제 기능 예시로 알려주기',
      '이후 대화도 카테고리 2번 사례 블럭에 계속 반영해두기',
    ],
    implementation: [
      '정적 버전은 오늘 바로 보여줄 한 페이지에 가볍고 빠르다는 관점으로 설명',
      'React 버전은 반복 섹션, 상태 관리, 편집 기능, 데이터화가 늘어날 때 유리하다는 기준으로 정리',
      '이번 대화도 2번 카테고리 사례 블럭에 추가해 양쪽 버전의 최신 상태를 맞춤',
    ],
  },
  {
    block: '대화 블럭 08',
    title: '공개 주소로 옮기기 위한 GitHub와 배포 흐름 압축 정리',
    request: [
      '만든 페이지를 공개 주소와 도메인으로 연결하는 전체 흐름을 한 번에 보고 싶기',
      'GitHub, Vercel, 도메인 연결이 어떤 순서로 이어지는지 큰 그림으로 이해하고 싶기',
      '세부 오류 사례보다 실제 진행 순서를 중심으로 정리하고 싶기',
    ],
    implementation: [
      '로컬에서 만든 페이지를 GitHub 저장소에 올리고, 그 저장소를 Vercel에 연결해 공개 주소를 만드는 흐름으로 압축',
      '저장소 생성, 원격 저장소 연결, push, 배포, 도메인 연결을 한 이야기로 묶어 이해하기 쉽게 정리',
      '작은 오류별 블럭은 지우고 실제로 공개 배포 준비가 완료된 지점까지의 큰 흐름만 남김',
    ],
  },
  {
    block: '대화 블럭 09',
    title: 'Git을 처음 배우는 기준으로 작업 흐름을 다시 설명',
    request: [
      'repo, commit, push, pull 같은 Git 기본 용어를 처음부터 이해하고 싶기',
      '지금까지 이 프로젝트에서 우리가 실제로 무엇을 했는지 순서대로 알고 싶기',
      '논의가 어떻게 이어져 현재의 파일 구조와 배포 준비 상태까지 왔는지 쉽게 설명받고 싶기',
    ],
    implementation: [
      'Git은 파일 변경 이력을 기록하는 도구, repo는 그 기록 상자, push와 pull은 내 컴퓨터와 GitHub 사이를 오가는 동작이라고 초보자 눈높이로 설명',
      '정적 페이지 제작, React 버전 분리, 폴더 재배치, 대화 기록 업데이트, GitHub 연결과 push 성공까지의 흐름을 순서대로 정리',
      '다음 단계는 Vercel 배포와 도메인 연결이라는 점까지 이어서 이해할 수 있게 설명',
    ],
  },
  {
    block: '대화 블럭 10',
    title: '앞으로 해야 하는 GitHub 반영과 Vercel 배포 순서 정리',
    request: [
      '지금 이 폴더 상태에서 무엇을 먼저 하고, 그다음에 무엇을 해야 하는지 끝까지 알고 싶기',
      'GitHub에 다시 반영하는 과정과 Vercel에 배포하는 과정을 초보자 기준으로 이해하고 싶기',
      '도메인 연결까지 포함한 다음 단계 전체를 순서대로 보고 싶기',
    ],
    implementation: [
      '현재 수정된 파일과 아직 GitHub에 안 올라간 상태를 확인한 뒤, 먼저 git status를 보고 올릴 파일을 결정하는 흐름으로 정리',
      '그다음 git add, git commit, git push로 GitHub 반영을 끝내고, Vercel에서 저장소를 불러와 React 폴더를 배포하는 순서로 설명',
      '마지막에는 Vercel 기본 주소 확인 후 커스텀 도메인을 연결하고 DNS가 반영될 때까지 기다리는 단계까지 한 번에 이어서 정리',
    ],
  },
  {
    block: '대화 블럭 11',
    title: 'Vercel에서 session-site를 import하는 실제 순서 설명',
    request: [
      'session-site를 Vercel에서 import하라는 말이 정확히 무슨 뜻인지 알고 싶기',
      '실제로 어느 버튼을 누르고 어떤 설정을 고르면 되는지 클릭 순서대로 알고 싶기',
      '배포 뒤 공개 주소 확인과 도메인 연결까지 한 흐름으로 이해하고 싶기',
    ],
    implementation: [
      'Vercel의 New Project에서 GitHub 저장소 session-site를 선택하는 것이 import라는 점으로 설명',
      'React 버전은 Root Directory를 react-site로 고르고 배포하면 된다고 구체적으로 정리',
      '배포 후 *.vercel.app 주소 확인, 이후 Settings > Domains에서 내 도메인을 추가하는 흐름까지 이어서 설명',
    ],
  },
]

const summaryChecklist = [
  '만들고 싶은 결과를 먼저 설명했다',
  '디자인이나 기능 조건을 함께 전달했다',
  '중간에 수정 요청을 다시 보냈다',
  '바뀐 내용을 요청사항과 구현사항으로 정리했다',
  '필요한 사례만 남기고 나머지는 접히게 정리했다',
]

const promptFormula = [
  { step: '01', title: 'Goal', text: '어떤 페이지를 만들고 싶은지 먼저 한 문장으로 말하기' },
  { step: '02', title: 'Context', text: '누가 볼 페이지인지, 어떤 용도인지 알려주기' },
  { step: '03', title: 'Constraints', text: '원하는 글꼴, 색감, 꼭 들어갈 요소, 피하고 싶은 느낌 적기' },
  { step: '04', title: 'Done When', text: '어느 상태가 되면 만족인지 끝나는 기준을 적기' },
]

const promptExamples = [
  {
    label: '예시 1. 시작용',
    text: `내가 소개하고 싶은 주제로 한 페이지 사이트를 만들어줘.
대상은 처음 보는 사람이고, 전체 분위기는 깔끔하고 읽기 쉬웠으면 좋겠어.
꼭 들어갈 섹션은 제목, 소개, 핵심 내용, 연락 방법이야.`,
  },
  {
    label: '예시 2. 수정용',
    text: `지금 만든 구조는 유지하고 첫 화면을 더 인상적으로 바꿔줘.
제목은 더 눈에 띄게, 카드 간격은 조금 더 넓게,
모바일에서도 읽기 편하게 정리해줘.`,
  },
  {
    label: '예시 3. 마무리용',
    text: `지금 결과를 짧게 정리해주고,
더 좋아질 수 있는 다음 수정 아이디어 2가지를 제안해줘.
초보자도 바로 다시 요청할 수 있게 한 줄 프롬프트도 같이 써줘.`,
  },
]

const promptChecklist = [
  '목표를 한 문장으로 적었다',
  '필요한 맥락을 함께 적었다',
  '폰트나 색감 같은 제약을 적었다',
  '완료 기준을 적었다',
  '결과를 보고 수정 요청을 다시 적었다',
]

const promptQuiz = [
  {
    question: 'Q1. 좋은 기본 프롬프트의 4요소는?',
    answer: '정답: Goal, Context, Constraints, Done When입니다.',
  },
  {
    question: 'Q2. 여러 사람이 서로 다른 페이지를 만들어도 공통으로 중요한 것은?',
    answer: '정답: 대상, 분위기, 필요한 요소, 완료 기준을 분명하게 전달하는 것입니다.',
  },
  {
    question: 'Q3. 첫 결과가 마음에 들지 않을 때 가장 좋은 다음 행동은?',
    answer: '정답: 유지할 점과 수정할 점을 나눠서 다시 요청하는 것입니다.',
  },
]

const checklistDefinitions = {
  setup: setupChecklist,
  summary: summaryChecklist,
  prompts: promptChecklist,
}

function readChecklistState(key, length) {
  if (typeof window === 'undefined') {
    return Array.from({ length }, () => false)
  }

  try {
    const stored = window.localStorage.getItem(`react-vibe-coding:${key}`)

    if (!stored) {
      return Array.from({ length }, () => false)
    }

    const parsed = JSON.parse(stored)
    return Array.from({ length }, (_, index) => Boolean(parsed[index]))
  } catch {
    return Array.from({ length }, () => false)
  }
}

function createInitialState() {
  return Object.fromEntries(
    Object.entries(checklistDefinitions).map(([key, items]) => [
      key,
      readChecklistState(key, items.length),
    ]),
  )
}

function ProgressPanel({ title, items, values, onToggle }) {
  const checkedCount = values.filter(Boolean).length
  const percent = items.length === 0 ? 0 : Math.round((checkedCount / items.length) * 100)

  return (
    <section className="progress-panel">
      <p className="panel-label">{title}</p>
      <div className="progress-head">
        <strong>{checkedCount} / {items.length} 완료</strong>
        <span>{percent}%</span>
      </div>
      <div className="meter">
        <div className="meter-fill" style={{ width: `${percent}%` }}></div>
      </div>
      <ul className="checklist">
        {items.map((item, index) => (
          <li key={item}>
            <label>
              <input
                type="checkbox"
                checked={values[index]}
                onChange={() => onToggle(index)}
              />
              {item}
            </label>
          </li>
        ))}
      </ul>
    </section>
  )
}

function QuizPanel({ items }) {
  return (
    <section className="quiz-panel">
      <p className="panel-label">간단한 퀴즈</p>
      <details className="toggle-block quiz-toggle-block">
        <summary className="toggle-summary">
          <span className="toggle-chip">
            <span className="toggle-label-closed">퀴즈 열기</span>
            <span className="toggle-label-open">퀴즈 닫기</span>
          </span>
        </summary>
        <div className="quiz-content">
          {items.map((item) => (
            <article className="quiz-item" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </details>
    </section>
  )
}

function LogEntry({ entry }) {
  return (
    <details className="log-entry toggle-block">
      <summary className="toggle-summary log-entry-head">
        <span className="log-entry-copy">
          <span className="panel-label">{entry.block}</span>
          <span className="log-entry-title">{entry.title}</span>
        </span>
        <span className="toggle-chip">
          <span className="toggle-label-closed">블럭 열기</span>
          <span className="toggle-label-open">블럭 닫기</span>
        </span>
      </summary>
      <div className="log-content">
        <div className="log-grid">
          <article className="summary-card">
            <h3>요청사항</h3>
            <ul className="summary-list">
              {entry.request.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="summary-card">
            <h3>구현사항</h3>
            <ul className="summary-list">
              {entry.implementation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </details>
  )
}

function PromptCard({ label, text }) {
  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const helper = document.createElement('textarea')
        helper.value = text
        helper.setAttribute('readonly', 'true')
        helper.style.position = 'absolute'
        helper.style.left = '-9999px'
        document.body.appendChild(helper)
        helper.select()
        document.execCommand('copy')
        document.body.removeChild(helper)
      }
    } catch {
      // Keep the UI simple for the workshop version.
    }
  }

  return (
    <article className="prompt-card">
      <p className="panel-label">{label}</p>
      <pre><code>{text}</code></pre>
      <button className="copy-button" type="button" onClick={handleCopy}>
        프롬프트 복사
      </button>
    </article>
  )
}

function App() {
  const [checklists, setChecklists] = useState(createInitialState)

  function toggleChecklistItem(key, index) {
    setChecklists((current) => {
      const nextValues = current[key].map((value, itemIndex) => (
        itemIndex === index ? !value : value
      ))

      window.localStorage.setItem(
        `react-vibe-coding:${key}`,
        JSON.stringify(nextValues),
      )

      return {
        ...current,
        [key]: nextValues,
      }
    })
  }

  const totalItems = Object.values(checklistDefinitions).reduce(
    (sum, items) => sum + items.length,
    0,
  )
  const checkedItems = Object.values(checklists).reduce(
    (sum, items) => sum + items.filter(Boolean).length,
    0,
  )
  const overallPercent = totalItems === 0 ? 0 : Math.round((checkedItems / totalItems) * 100)

  return (
    <main className="page-shell">
      <header className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">React 버전 수업용 사이트</p>
          <h1>VS Code 설치부터{'\n'}바이브코딩 첫 결과물까지</h1>
          <p className="hero-description">
            기존 정적 페이지를 바탕으로 React 구조로 다시 만든 버전입니다.
            오늘 바로 시연할 수 있게 한 페이지 형태는 유지하되, 이후에 섹션과
            기능을 늘리기 쉬운 방식으로 정리했습니다.
          </p>
          <div className="hero-tags">
            {heroTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="hero-side">
          <section className="mini-panel">
            <p className="panel-label">오늘의 진행 흐름</p>
            <ul className="mini-list">
              <li>1. VS Code 설치와 한글 설정</li>
              <li>2. Codex 설치와 로그인</li>
              <li>3. 어떤 요청이 어떤 구현으로 이어지는지 보기</li>
              <li>4. 각자 원하는 페이지를 직접 프롬프트로 만들어보기</li>
            </ul>
          </section>

          <section className="mini-panel progress-overview">
            <p className="panel-label">전체 진도</p>
            <strong>{checkedItems} / {totalItems} 완료</strong>
            <div className="meter">
              <div className="meter-fill" style={{ width: `${overallPercent}%` }}></div>
            </div>
            <p className="progress-note">체크 상태는 브라우저에 저장됩니다.</p>
          </section>
        </div>
      </header>

      <nav className="section-nav" aria-label="카테고리 바로가기">
        <a href="#setup">VS Code 설치 및 Codex 사용법</a>
        <a href="#summary">대화 기록 요약본</a>
        <a href="#prompts">간단한 프롬프트 팁들</a>
      </nav>

      <section className="agenda-strip" aria-label="수업 포인트">
        {agendaItems.map((item) => (
          <article className="agenda-card" key={item.label}>
            <p className="panel-label">{item.label}</p>
            <h2>{item.title}</h2>
          </article>
        ))}
      </section>

      <section className="category-card" id="setup">
        <div className="section-head">
          <p className="section-number">01</p>
          <div>
            <p className="eyebrow">VS Code 설치 및 Codex 사용법</p>
            <h2>처음 설치하는 사람도 따라가기 쉬운 순서로 정리한 시작 가이드</h2>
            <p className="section-description">
              처음 VS Code를 켜면 화면이 영어라서 당황하기 쉽습니다. 그래서
              아래는 설치, 화면 한글로 바꾸기, 작업 폴더 열기, Codex 설치,
              로그인, 첫 요청 순서로 아주 처음 쓰는 사람 기준에서 풀어쓴 안내입니다.
              아래 내용은 2026년 4월 7일 기준 공식 문서를 참고해 정리했습니다.
            </p>
          </div>
        </div>

        <div className="section-grid">
          <article className="content-panel">
            <p className="panel-label">초보자용 설명</p>
            <ol className="step-list">
              {setupSteps.map((step, index) => (
                <li key={step}>
                  <strong>{index + 1}단계:</strong> {step}
                </li>
              ))}
            </ol>

            <div className="callout">
              <p className="panel-label">헷갈리기 쉬운 단어</p>
              <p>
                <code>확장 기능</code>은 휴대폰에 앱을 추가하듯 VS Code에 기능을 더하는 것이라고
                설명하면 쉽습니다. <code>작업 폴더</code>는 지금 만들 파일들을 모아두는 폴더,
                <code>프롬프트</code>는 Codex에게 보내는 요청 문장이라고 생각하면 됩니다.
              </p>
            </div>

            <div className="callout">
              <p className="panel-label">처음 시작할 때 추천 순서</p>
              <p>
                정말 처음이라면 VS Code 설치 후 바로 한글 확장을 먼저 깔고,
                그다음 Codex 확장을 설치하는 순서가 가장 덜 어렵습니다.
              </p>
            </div>

            <div className="callout">
              <p className="panel-label">페이지 실행 방법</p>
              <p>
                가장 간단한 방법은 <code>index.html</code>을 브라우저로 여는 것입니다.
                다만 체크 상태 저장이나 복사 기능까지 안정적으로 보려면 로컬 서버로 여는 편이 좋습니다.
                이때도 터미널에 무슨 명령어를 입력하면 되는지 Codex에게 물어보면 필요한 명령을 바로 안내받을 수 있습니다.
                아래는 어떤 프로젝트에도 응용할 수 있는 예시입니다.
              </p>
              <pre><code>{`cd my-project-folder
python3 -m http.server 8000
# 브라우저에서 http://127.0.0.1:8000 열기
# 8000 포트가 이미 사용 중이면 8010 같은 다른 포트 사용`}</code></pre>
            </div>

            <div className="resource-links">
              <a href="https://code.visualstudio.com/Download" target="_blank" rel="noreferrer">VS Code 다운로드</a>
              <a href="https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-ko" target="_blank" rel="noreferrer">VS Code 한글 언어 팩</a>
              <a href="https://developers.openai.com/codex/ide" target="_blank" rel="noreferrer">Codex IDE 문서</a>
              <a href="https://developers.openai.com/codex/auth" target="_blank" rel="noreferrer">Codex 로그인 문서</a>
              <a href="https://developers.openai.com/codex/cli" target="_blank" rel="noreferrer">Codex CLI 문서</a>
            </div>
          </article>

          <aside className="side-stack">
            <ProgressPanel
              title="진도 체크"
              items={setupChecklist}
              values={checklists.setup}
              onToggle={(index) => toggleChecklistItem('setup', index)}
            />
            <QuizPanel items={setupQuiz} />
          </aside>
        </div>
      </section>

      <section className="category-card" id="summary">
        <div className="section-head">
          <p className="section-number">02</p>
          <div>
            <p className="eyebrow">대화 기록 요약본</p>
            <h2>Codex에게 무엇을 요청했고 무엇이 구현됐는지 보여주는 구역</h2>
            <p className="section-description">
              이 카테고리는 긴 대화 자체를 설명하기 위한 곳이 아니라, 이런 요청을 하면
              이런 결과를 만들 수 있다는 점을 바로 보여주기 위한 예시 모음입니다.
            </p>
          </div>
        </div>

        <div className="section-grid">
          <article className="content-panel">
            <p className="panel-label">요청사항 / 구현사항 블럭</p>
            <div className="log-stack">
              {logEntries.map((entry) => (
                <LogEntry key={entry.title} entry={entry} />
              ))}
            </div>
          </article>

          <aside className="side-stack">
            <ProgressPanel
              title="진도 체크"
              items={summaryChecklist}
              values={checklists.summary}
              onToggle={(index) => toggleChecklistItem('summary', index)}
            />
          </aside>
        </div>
      </section>

      <section className="category-card" id="prompts">
        <div className="section-head">
          <p className="section-number">03</p>
          <div>
            <p className="eyebrow">간단한 프롬프트 팁들</p>
            <h2>각자가 원하는 페이지를 만들 때 바로 써먹을 수 있는 기본 팁</h2>
            <p className="section-description">
              실습에서는 모두 같은 결과물을 만들 필요가 없습니다. 중요한 건 내가 원하는
              화면과 분위기, 필요한 기능을 Codex가 이해할 수 있게 전달하는 것입니다.
            </p>
          </div>
        </div>

        <div className="section-grid">
          <article className="content-panel">
            <p className="panel-label">프롬프트 공식</p>
            <div className="formula-grid">
              {promptFormula.map((item) => (
                <article className="formula-card" key={item.step}>
                  <span>{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>

            <div className="prompt-grid">
              {promptExamples.map((item) => (
                <PromptCard key={item.label} label={item.label} text={item.text} />
              ))}
            </div>

            <div className="callout">
              <p className="panel-label">실습 팁</p>
              <p>
                정답 같은 프롬프트를 찾으려 하기보다, 대상, 분위기, 꼭 필요한 내용,
                바꾸고 싶은 점을 분명하게 말하는 편이 훨씬 도움이 됩니다.
              </p>
            </div>

            <div className="resource-links">
              <a href="https://developers.openai.com/codex/learn/best-practices" target="_blank" rel="noreferrer">Codex Best Practices</a>
              <a href="https://developers.openai.com/codex/prompting" target="_blank" rel="noreferrer">Codex Prompting</a>
            </div>
          </article>

          <aside className="side-stack">
            <ProgressPanel
              title="진도 체크"
              items={promptChecklist}
              values={checklists.prompts}
              onToggle={(index) => toggleChecklistItem('prompts', index)}
            />
            <QuizPanel items={promptQuiz} />
          </aside>
        </div>
      </section>

      <footer className="footer">
        <p>수업용 안내 페이지의 React 버전. 기존 시연 흐름은 유지하고, 이후 확장하기 쉽게 다시 구성했습니다.</p>
      </footer>
    </main>
  )
}

export default App
