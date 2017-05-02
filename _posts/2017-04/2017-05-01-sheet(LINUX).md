---
layout: post
title:  Linux cheetsheet
date:   2017-05-01 01:40:16
description: 리눅스 개발환경셋팅 및 활용방법
category: cheatSheet
tag: Linux
---

# linux-sheet
리눅스 초기 설정 개인정인 방법 및 치트시트


## Mac 초기 설정

Step 1. zsh 설치
```js
zsh --version //체크 zsh 설치유무

brew update
brew install zsh
```
이후 설치된 oh-my-zsh을 사용하도록 설정.
```
chsh -s /usr/local/bin/zsh
```


Step 2. oh-my-zsh 설치
```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

Step 3. i-term2 설치

<a href="https://www.iterm2.com/">iterm2</a>

## 자주쓰는 명령어 모음
```js
cat
// 파일의 표준 출력
// 포맷: cat [options] [file(s)]
// 출력한 내용을 저장할 수 있다. cat > target

chfs
//사용자의 shell을 바꾸는 명령어

exit
//현재의 프로세스를 종료

find
// 파일명과 동일한 파일을 찾고, 경로를 출력
// 포맷: find [file]

finger
// 로그인 사용자에 대한 정보를 출력

grep
// 파일중에서 어떠한 패턴이나 일치하는 내용을 검색
// 포맷: grep [content(검색할 내용)] [file(파일)] 예) grep .rvm .bash_history

head
// 파일에 최상단부터 어느정도의 내용을 출력
// 포맷: head [option] [file]

history
// 최근 작업 내역을 확인
// 포맷: history [확인할 갯수]

kill
// 실행되고 있는 프로세스를 종료

last
// 최근 시스템에 접근한 사용자 출력

ls
// 디렉토리와 파일의 정보를 출력
// 포맷: ls [options] [file or directory]
// --option--
// -l 파일에 대한 정보(파일 허용권, 소유자, 그룹, 크기, 날짜)를 긴 형식으로 출력
// -a 는 모든 파일을 출력(디렉토리의 히든 파일도 출력)
// -i 파일의 'inode'도 같이 출력
// -t 최종 수정된 시간별로 정렬
// -u 변경되지 않았더라도 최근에 엑세스했던 파일 출력
// -F 파일의 특성을 출력
// -R 하위 디렉토리의 파일도 모두 출력
// -C 컬럼별로 파일을 출력
// -m 가로로 간단히 출력

mv
// 파일의 이름을 변경하거나 이동
// 포맷: ls [options] [origin-file] [affer-file or directory/affer-file]
// --option--
// -i 이미 존재하는 파일을 덮어 쓸 것인지
// -u 이동하는 파일이 최근 파일일 경우에만 이동
// -b 백업파일을 만든후 파일 이동

mkdir
// 폴더 생성

nslookup
// 도메인의 IP주소나 도메인 등의 정보를 출력

passwd
// 사용자 패스워드 변경

ping
// ping(packet internet gopher)은 자신의 네트워크나 다른 네트워크가 통신이 잘되고 있는지 점검

ps
// 프로세스에 관련한 리스트 출력

pwd
// 현재 사용자가 있는 디렉토리 출력

rm
// 파일을 제거, 리눅스는 휴지통같은 임시저장이 없음
// 포맷: rm [options] file(s)
// --option--
// -f 묻지도 따지지도 않고 삭제
// -r 서브디렉토리를 포함한 모든 내용을 삭제

su
// 다른 아이디로 재접속

tail
// 파일의 최하단내용부터 출력
// 포맷: tail [option] [file]
// -f 파일의 10줄을 출력해주고 파일의 내용을 실시간으로 계속해서 출력
// -n (N)10 (N)10개수만큼의 라인을 출력

touch
// 파일생성
// 포맷: touch [file]

whereis
// $PATH로 지정된 경로에서 찾아 전체 경로명 출력
// 포맷: whereis [실행프로그램]


```