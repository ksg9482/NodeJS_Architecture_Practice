//컨트롤러와 서비스의 분리, 의존성 주입을 적용하면 Routing Layer는 다음과 같은 형태가 된다.

PerformanceResourceTiming.post('/',
    async (req, res, next) => {
        const userDTO = req.body;
        
        const userServiceInstance = Container.get(UserService); //Service locator

        const {user, company} = userServiceInstance.Signup(userDTO);

        return res.json({user, company});
    });