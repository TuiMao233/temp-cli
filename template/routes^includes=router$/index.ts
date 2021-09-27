import KoaRouter from 'koa-router'
import common from './common'

const router = new KoaRouter()

router.use('/common', common.routes(), common.allowedMethods())

export default router
