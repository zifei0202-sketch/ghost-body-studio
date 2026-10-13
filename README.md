# Ghost Body Studio

드레스폼에 입혀 찍은 샘플 사진(앞·옆·뒤)을 바이어 제출용 고스트 바디 이미지로 바꿔 주는 웹사이트.
모든 처리는 **사용자 브라우저 안에서** 이루어집니다. 사진이 외부 서버로 전송되지 않고, 비용도 0원입니다.

## 처리 순서
1. 배경 제거: 오픈소스 AI 모델(@imgly/background-removal)을 브라우저에서 실행
2. 바디 제거: 목 위·밑단 아래·목 안쪽으로 보이는 드레스폼(Alvaform 베이지) 색 영역을 자동 삭제, 스탠드는 분리된 조각으로 처리해 삭제
3. 목 안쪽 채우기: 바디가 빠진 목 구멍을 옷 색보다 어두운 안감 톤으로 입체 음영 처리
4. 정렬·출력: 흰 배경, 3컷 동일 배율, 파일명 `Style#-ColorCode-Front|Side|Back`, 최대 용량(기본 5MB) 이하로 자동 압축
5. 편집기: 마술봉 지우기, 지우개, 복원 브러시, 안감 브러시, 스포이트, 되돌리기(Ctrl+Z), 좌우 반전

## 로컬 실행
```bash
npm install
npm run dev        # http://localhost:5173
```

## Vercel 배포
1. 이 폴더를 GitHub 저장소에 올리기
2. vercel.com → Add New → Project → 저장소 선택
3. Framework Preset: **Vite** (자동 인식) → Deploy
   - Build Command `npm run build`, Output Directory `dist`

GitHub 없이 바로 배포하려면:
```bash
npm i -g vercel
vercel --prod
```

## AI 모델 파일 위치
- 기본 설정: 처음 접속할 때 모델(약 40~80MB)을 imgly CDN(`staticimgly.com`)에서 내려받고, 이후에는 브라우저 캐시를 사용합니다.
- 회사 방화벽이 CDN을 막으면 모델을 직접 호스팅하세요.
  ```bash
  npm i -D @imgly/background-removal-data@1.4.5
  cp -r node_modules/@imgly/background-removal-data/dist public/bg-data
  ```
  그다음 Vercel 환경 변수에 `VITE_BG_PUBLIC_PATH=/bg-data/`를 넣고 다시 배포하세요.
  (패키지가 약 210MB입니다. `public/bg-data`에서 필요 없는 모델 파일은 지워도 됩니다.)

## 좋은 결과를 위한 촬영 팁
- 옷·바디와 대비되는 단색 배경을 쓰고, 삼각대로 같은 거리·높이에서 촬영 (바디만 회전)
- 바디 목 윗부분까지 프레임 안에 넣기
- 옷이 베이지·아이보리 계열이면 바디와 색이 비슷해 자동 제거가 약해집니다. 편집기의 마술봉이나 브러시로 마무리하세요.
