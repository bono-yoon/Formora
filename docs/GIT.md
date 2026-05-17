# Formora — Git / GitHub 연결

## 로컬 저장소

프로젝트 루트(`C:\Users\User\Projects\static-page-builder`)에 **독립 Git 저장소**가 초기화되어 있습니다.

- 기본 브랜치: `main`
- 초기 커밋: Formora MVP + 의존성 고정 + 보안 검토 문서

```bash
cd C:\Users\User\Projects\static-page-builder
git status
git log -1 --oneline
```

## GitHub 원격 (`Formora`)

원격이 다음으로 설정되어 있습니다.

```text
origin  https://github.com/bono-yoon/Formora.git
```

원격 저장소: **https://github.com/bono-yoon/Formora.git**

GitHub에 저장소가 없으면 push가 `Repository not found`로 실패합니다. 아래 순서로 생성하세요.

### 1. GitHub에서 저장소 생성

1. [https://github.com/new](https://github.com/new) 접속
2. Repository name: **`Formora`** (대소문자 동일 권장)
3. **Private** 또는 Public 선택
4. **README / .gitignore / license 추가하지 않음** (로컬에 이미 있음)
5. Create repository

사용자 이름이 `bono-yoon`이 아니면 원격 URL을 수정하세요.

```bash
git remote set-url origin https://github.com/<YOUR_GITHUB_USER>/Formora.git
```

### 2. 최초 push

```bash
git push -u origin main
```

### 3. (선택) GitHub CLI

`gh`가 설치되어 있다면:

```bash
gh repo create Formora --private --source=. --remote=origin --push
```

## 주의: 상위 폴더 Git

`C:\Users\User`에 별도 `.git`이 있으면, 홈 디렉터리 전체가 추적될 수 있습니다. **Formora 작업은 이 프로젝트 폴더에서만** `git` 명령을 실행하세요. 홈 디렉터리용 `.git`이 실수로 만들어진 것이라면 제거를 검토하세요.
