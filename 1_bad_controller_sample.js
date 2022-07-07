// 하지 말아야 하는 방식의 예제
route.post('/', async (req, res, next) => {
    //이것은 미들웨어나  Joi 같은 라이브러리를 이용해서 처리해야 한다.
    const userDTO = req.body;
    const isUserValid = validators(userDTO);

    if(!isUserValid) {
        return res.status(400).end();
    };

    //여기에 너무 많은 비즈니스 로직이 있다.
    const userRecord = await UserModel.create(userDTO);
    delete userRecord.password;
    delete userRecord.salt;
    const companyRecord = await CompanyModel.create(userRecord);
    const companyDashboard = await companyDashboard.create(userRecord, companyRecord);


    // 중략...


    //이와 같은 최적화(optimization)는 모든 것을 엉망으로 만든다.

    //클라이언트로 응답이 보내지는데 코드는 계속 실행된다.
    res.json({user: userRecord, company:companyRecord});

    const salaryRecord = await SalaryModel.create(userRecord, companyRecord);
    eventTracker.track('user_signup', userRecord, companyRecord, salaryRecord);
    intercom.createUser(userRecord);
    gaAnalistics.event('user_signup', userRecord);
    await EmailService.startSignupSequece(userRecord);
});