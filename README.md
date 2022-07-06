# NodeJS_Architecture_Practice

## 좋은 프로젝트 구조의 필요성
* Express.js는 Node.js REST API를 만드는데 좋은 프레임워크이지만, 좋은 프로젝트 구조를 알려주지는 않는다.
* 올바른 Node.js 프로젝트 구조는 코드의 중복을 피하게 해주고 안정성을 높여준다. 그리고 서비스를 확장하는데 도움이 된다.

## 폴더구조
src/app.js          - app의 엔트리 포인트
src/api             - app의 모든 엔드포인트에 대한 루트(route) 컨트롤러
src/config          - 환경 변수 및 구성 관련 항목
src/jobs            - agenda.js에 대한 작업 정의
src/loaders         - 모듈로 분할 한 시작 프로세스
src/models          - 데이터베이스 모델
src/services        - 모든 비즈니스 로직
src/subscribers     - 비동기(async) 작업을 위한 이벤트 핸들러
src/types           - 타입스크립트용 타입 선언 파일

## 3계층 설계 (3 Layer Architecture)
관심사 분리(Separation of Concerns)를 적용하기 위해 비즈니스 로직을 API Route와 분리한다.

* Controller
* Service Layer
* Data Acceess Layer

 컨트롤러, 서비스, 데이터 엑세스 3계층으로 나누어 관심사를 분리한다.   
 이를 Express에 적용하면 다음과 같다.

* Express Route Controller
* Service Class
* DataBase ORM/ODM(Object Relational Mapping / Object Document Mapping)

Node.js 서버에서 API 호출을 하는 것은 좋은 생각이 아니다.

#### Controller에 비즈니스 로직을 넣지 말라
컨트롤러에 바로 비즈니스 로직을 작성하면 스파게티 코드가 되기 마련이다. 수많은 req와 res오브젝트를 다루게 되고, response를 언제 보내야 할지 또는 프로세스를 백그라운드에서 계속 실행해야 할지 구분하는 것은 어렵다.

#### Service 계층에 비즈니스 로직을 넣어라
비즈니스 로직은 service 계층에 있어야 한다. 이는 분명한 목적이 있는 클래스의 집합이며 SOLID 원칙을 적용한 것이다.
* 서비스 계층에서는 SQL Query 형태의 코드가 있어선 안된다. SQL Query는 Data Access Layer에서 사용한다.
* req, res 객체를 서비스 계층에서 전달하면 안된다.
* 상태 코드, 헤더 등 HTTP 전송 계층과 관련된 것들은 반환하면 안된다.

#### Pub/Sub 계층도 사용하라
Pub/Sub 패턴은 3계층 구조를 벗어나지만 매우 유용하다.   
간단한 Node.js API 엔드포인트에서 사용자를 생성한 뒤 서드파티(third-party) 서비스를 호출하거나 서비스 분석, 이메일 전송 등의 작업을 하고 싶을 경우 시작 부터 책임을 분리하여 SOLID의 SRP(단일 책임 원칙)을 준수 할 수 있다.

그렇지 않으면 짧고 간단한 기능이더라도 여러가지 분야의 작업이 하나의 함수에 뒤섞여 SRP를 위배하게 된다.

#### 독립적인 서비스들을 직접 호출하는 것 보다 이벤트를 발생시켜라
이렇게 하면 이제 리스너들이 그들의 역할을 책임지게 된다.   
그리고 이벤트 핸들러/리스너들은 여러 파일로 나눌 수 있다.

### 계층 분리 정리
* Controller 계층
  * req, res 객체, 상태코드 등 관리
  * 해당하는 서비스 비즈니스 로직을 불러 작업 처리
  * 처리된 데이터를 response 반환
* Service 계층
  * 비즈니스 로직을 수행하여 데이터 가공
  * 해당하는 Data Acceess 계층(models)에 접속하여 데이터베이스 통신 요청
* Data Acceess 계층
  * SQL Query를 통해 데이터베이스와 통신
  * 요청대로 데이터베이스를 CRUD함
* Pub/Sub 계층
  * 3계층에서 벗어났으나 유용
  * 필요하지만 SRP를 위배하는 작업을 실시
  * 함수를 분리하여 SRP를 준수할 수 있도록 해줌

이하의 포스팅대로 연습을 진행하였습니다.
[링크](https://velog.io/@hopsprings2/%EA%B2%AC%EA%B3%A0%ED%95%9C-node.js-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90-%EC%84%A4%EA%B3%84%ED%95%98%EA%B8%B0#%EC%9C%A0%EB%8B%9B-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%98%88%EC%A0%9C-)

이하의 레포지토리는 해당 방법을 통해 작성된 예제입니다.
[링크](https://github.com/santiq/bulletproof-nodejs)