MG.api = {
  login, // 登录

  getFolderNodeList, //获取目录list

  findUserByPage, // 获取用户list
  findUserById, // 根据用户ID获取用户信息
  saveUser, // 新增or编辑用户，编辑时可不是输入密码
  deleteUserById, // 删除用户

  findAllCmsNav, //查询所有cms导航
  findCmsNavById, //查询CMS导航
  saveCmsNavById, //新增&编辑cms导航
  deleteCmsNavById, //删除cms导航
  
  findAllCmsCarouse, //查询所有cms轮播
  findCmsCarouseById, //查询CMS轮播
  saveCmsCarouseById, //新增&编辑cms轮播
  deleteCmsCarouseById, //删除cms轮播
  
  findAllCmsCategory, //查询所有cms栏目
  findCmsCategoryById, //查询CMS栏目
  saveCmsCategoryById, //新增&编辑cms栏目
  deleteCmsCategoryById, //删除cms栏目

  findAllCmsCategoryType, //查询所有cms栏目分类
  findCmsCategoryTypeById, //查询CMS栏目分类
  saveCmsCategoryTypeById, //新增&编辑cms栏目分类
  deleteCmsCategoryTypeById, //删除cms栏目分类

  findCmsArticleByPage, // 文章分页查询
  findCmsArticleById, //文章ID查询
  saveCmsArticleById, //新增&编辑cms文章
  deleteCmsArticleById, //删除cms文章

  openFolder,
};
async function openFolder(path){return await MG.post('/openFolder',{path});}
async function getFolderNodeList(path){return await MG.post('/getFolderNodeList',{path});}

async function findCmsArticleByPage(){return await MG.post('/findCmsArticleByPage',{page, limit});}
async function findCmsArticleById(id){return await MG.post('/findCmsArticleById',{id}) }
async function saveCmsArticleById(entity){return await MG.post('/saveCmsArticleById', entity);}
async function deleteCmsArticleById(id){return await MG.post('/deleteCmsArticleById', {id});}
async function findAllCmsCategoryType(){return await MG.post('/findAllCmsCategoryType');}
async function findCmsCategoryTypeById(id){return await MG.post('/findCmsCategoryTypeById',{id}) }
async function saveCmsCategoryTypeById(entity){return await MG.post('/saveCmsCategoryTypeById', entity);}
async function deleteCmsCategoryTypeById(id){return await MG.post('/deleteCmsCategoryTypeById', {id});}
async function findAllCmsCategory(){return await MG.post('/findAllCmsCategory');}
async function findCmsCategoryById(id){return await MG.post('/findCmsCategoryById',{id}) }
async function saveCmsCategoryById(entity){return await MG.post('/saveCmsCategoryById', entity);}
async function deleteCmsCategoryById(id){ return await MG.post('/deleteCmsCategoryById', {id}); }
async function findCmsCarouseById(carouseId){return await MG.post('/findCmsCarouseById',{id: carouseId }) }
async function deleteCmsCarouseById(carouseId){return await MG.post('/deleteCmsCarouseById', {id: carouseId});}
async function saveCmsCarouseById(carouse){return await MG.post('/saveCmsCarouseById', carouse);}
async function findAllCmsCarouse(){return await MG.post('/findAllCmsCarouse');}
async function findCmsNavById(navId){return await MG.post('/findCmsNavById',{id: navId }) }
async function deleteCmsNavById(navID){return await MG.post('/deleteCmsNavById', {id: navID});}
async function saveCmsNavById(nav){ return await MG.post('/saveCmsNavById', nav);}
async function findAllCmsNav(){ return await MG.post('/findAllCmsNav'); }
async function login(loginName, password){ return await MG.post('/login',{loginName, password}) }
async function findUserById(userId){ return await MG.post('/findUserById',{id: userId }) }
async function saveUser(user){ return await MG.post('/saveUser',user) }
async function deleteUserById(userId){ return await MG.post('/deleteUserById',{id: userId }) }
async function findUserByPage(page, limit){ return await MG.post('/findUserByPage',{page, limit}) }