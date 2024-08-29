import { LoDashStatic } from "lodash";
export type t_xU = LoDashStatic & {
	_: Function;
	fs: object;
	path: object;
	MAP_ORM: object;
	var: object;
	TARGET_PREFIX: string;
	applog: object;
	mail: object;
	$orm: Function;
	schemaToJson: Function;
	$response: Function;
	log: Function;
	fileExist: Function;
	time: Function;
	fieldSelect: Function;
	rand: Function;
	json_parse: Function;
	randStr: Function;
	getIp: Function;
	$saltIt: Function;
	expireDate: Function;
	expireDay: Function;
	sendMail: Function;
	validateSearchKeyword: Function;
	filterRes: Function;
	handleVarPath: Function;
	verifyPath: Function;
	sandbox: Function;
	trim: Function;
	ltrim: Function;
	rtrim: Function;
	ensureParamsType: Function;
	validateParams: Function;
	saveLog: Function;
	createAction: Function;
	handleParamsValue: Function;
	getCaseList: Function;
	runCaseScript: Function;
	getUserdata: Function;
	handleMockScript: Function;
	createWebAPIRequest: Function;
	storageCreator: Function;
	dayjs: Function;
	handleBasepath: Function;
	socketMsg: Function;
	isInput: Function;
	isSame: Function;
	autowareController: Function;
	$hashCode: Function;
	schema: Function;
	swagger_id: Function;
	isCloudDiskDirExist: Function;
	isExist: Function;
	getSystemDiskSize: Function;
	DbConnection: object;
};

export type t_orm = {
	WikiOrder: {
		/**
	 * @description 获取表名
	 *
	 * @returns
	 *
	 * @memberOf ModelWikiOrder
	 
*/
		getName: (...args: any) => Promise<any>;

		getSchema: (...args: any) => Promise<any>;

		/**
	 * @description 保存
	 *
	 * @param {any} data
	 * @returns
	 *
	 * @memberOf ModelWikiOrder
	 
*/

		save: (data: any) => Promise<any>;

		detail: (...args: any) => Promise<any>;

		upsertOne: (...args: any) => Promise<any>;

		delete: (_id: string) => Promise<any>;

		up: (_id: any, data: any) => Promise<any>;
	};
	wiki: {
		getName: (...args: any) => Promise<any>;

		getSchema: (...args: any) => Promise<any>;

		save: (...args: any) => Promise<any>;

		/**
	 *
	 * 带单，无markdown detail
	 *
	 * @param {any} [params={}]
	 * @returns
	 *
	 * @memberOf ModelWiki
	 
*/

		menu: (parems: {
			belong_type?: string;
			belong_id?: string;
			select?: string;
		}) => Promise<any>;

		detail: (...args: any) => Promise<any>;

		/* find  find  find  find  find  find  find  find  find  find  find
		 */
		delete: (...args: any) => Promise<any>;

		up: (...args: any) => Promise<any>;
	};
	VerifyCode: {
		getName: (...args: any) => Promise<any>;

		getSchema: (...args: any) => Promise<any>;

		upsertOne: (...args: any) => Promise<any>;

		findByEmail: (...args: any) => Promise<any>;

		del: (...args: any) => Promise<any>;
	};
	user: {
		getName: (...args: any) => Promise<any>;

		getSchema: (...args: any) => Promise<any>;

		save: (...args: any) => Promise<any>;

		count: (...args: any) => Promise<any>;

		list: (...args: any) => Promise<any>;

		findByUids: (...args: any) => Promise<any>;

		listWithPaging: (...args: any) => Promise<any>;

		listCount: (...args: any) => Promise<any>;

		findByEmail: (...args: any) => Promise<any>;

		findById: (...args: any) => Promise<any>;

		del: (...args: any) => Promise<any>;

		/**
	 * @description
	 *
	 * @param {any} id
	 * @param {any} data
	 * @returns
	 *
	 * @memberOf ModelUser
	 
*/
		update: (...args: any) => Promise<any>;

		search: (...args: any) => Promise<any>;
	};
	token: {
		getName: (...args: any) => Promise<any>;

		getSchema: (...args: any) => Promise<any>;

		save: (...args: any) => Promise<any>;

		get: (...args: any) => Promise<any>;

		findId: (...args: any) => Promise<any>;

		up: (...args: any) => Promise<any>;
	};
	storage: {
		getName: (...args: any) => Promise<any>;

		getSchema: (...args: any) => Promise<any>;

		save: (...args: any) => Promise<any>;

		del: (...args: any) => Promise<any>;

		get: (...args: any) => Promise<any>;
	};
	ResourceChunk: {
		getName: (...args: any) => Promise<any>;

		getSchema: (...args: any) => Promise<any>;

		save: (data: any) => Promise<any>;

		delChunksByFileHash: (...args: any) => Promise<any>;

		/**
	 * 根据md5查询分片信息
	 * @param {any} md5
	 * @returns
	 
*/

		findByMd5: (md5: string) => Promise<any>;
	};
	Resource: {
		getName: (...args: any) => Promise<any>;

		getSchema: (...args: any) => Promise<any>;

		save: (data: object) => Promise<any>;

		update: (id: number | number[], modify: object) => Promise<any>;

		updateOneByMd5: (...args: any) => Promise<any>;

		getResourceById: (...args: any) => Promise<any>;

		getResourceByName: (...args: any) => Promise<any>;

		findByMd5: (...args: any) => Promise<any>;

		findAll: (...args: any) => Promise<any>;

		/**
	 * @description
	 *
	 * @param {any} condition
	 * @returns
	 *
	 * @memberOf ModelResource
	 
*/

		search: (
			condition: object,
			orderBy?: object,
			select?: string
		) => Promise<any>;
	};
	project: {
		getName: (...args: any) => Promise<any>;

		getSchema: (...args: any) => Promise<any>;

		constructor: (...args: any) => Promise<any>;

		getAuthList: (...args: any) => Promise<any>;

		updateMember: (...args: any) => Promise<any>;

		save: (...args: any) => Promise<any>;

		handleEnvNullData: (...args: any) => Promise<any>;

		get: (...args: any) => Promise<any>;

		getByEnv: (...args: any) => Promise<any>;

		getProjectWithAuth: (...args: any) => Promise<any>;

		getBaseInfo: (...args: any) => Promise<any>;

		getByDomain: (...args: any) => Promise<any>;

		checkNameRepeat: (...args: any) => Promise<any>;

		checkDomainRepeat: (...args: any) => Promise<any>;

		list: (...args: any) => Promise<any>;

		/* 获取项目数量统计
		 */
		getProjectListCount: (...args: any) => Promise<any>;

		countWithPublic: (...args: any) => Promise<any>;

		paging: (...args: any) => Promise<any>;

		listCount: (...args: any) => Promise<any>;

		countByGroupId: (...args: any) => Promise<any>;

		del: (...args: any) => Promise<any>;

		delByGroupid: (...args: any) => Promise<any>;

		up: (...args: any) => Promise<any>;

		addMember: (...args: any) => Promise<any>;

		delMember: (...args: any) => Promise<any>;

		checkMemberRepeat: (...args: any) => Promise<any>;

		changeMemberRole: (...args: any) => Promise<any>;

		changeMemberEmailNotice: (...args: any) => Promise<any>;

		search: (...args: any) => Promise<any>;
	};
	log: {
		getName: (...args: any) => Promise<any>;

		getSchema: (...args: any) => Promise<any>;

		/**
	 * @param {String} content log内容
	 * @param {Enum} type log类型， ['user', 'group', 'interface', 'project', 'other']
	 * @param {Number} uid 用户id
	 * @param {String} username 用户名
	 * @param {Number} typeid 类型id
	 * @param {Number} add_time 时间
	 
*/
		save: (...args: any) => Promise<any>;

		del: (...args: any) => Promise<any>;

		list: (...args: any) => Promise<any>;

		listWithPaging: (...args: any) => Promise<any>;

		listWithPagingByGroup: (...args: any) => Promise<any>;

		listCountByGroup: (...args: any) => Promise<any>;

		listCount: (...args: any) => Promise<any>;

		listWithCatid: (...args: any) => Promise<any>;
	};
	interfaceCol: {
		getName: (...args: any) => Promise<any>;

		getSchema: (...args: any) => Promise<any>;

		save: (...args: any) => Promise<any>;

		get: (...args: any) => Promise<any>;

		count: (...args: any) => Promise<any>;

		list: (...args: any) => Promise<any>;

		del: (...args: any) => Promise<any>;

		delByProjectId: (...args: any) => Promise<any>;

		up: (...args: any) => Promise<any>;

		upColIndex: (...args: any) => Promise<any>;
	};
	interfaceCategory: {
		getName: (...args: any) => Promise<any>;

		getSchema: (...args: any) => Promise<any>;

		save: (...args: any) => Promise<any>;

		get: (...args: any) => Promise<any>;

		count: (...args: any) => Promise<any>;

		list: (...args: any) => Promise<any>;

		search: (...args: any) => Promise<any>;

		del: (...args: any) => Promise<any>;

		delByProjectId: (...args: any) => Promise<any>;

		up: (...args: any) => Promise<any>;

		upCatIndex: (...args: any) => Promise<any>;
	};
	interfaceCase: {
		getName: (...args: any) => Promise<any>;

		getSchema: (...args: any) => Promise<any>;

		save: (...args: any) => Promise<any>;

		/*获取全部测试接口信息
		 */
		getInterfaceCaseListCount: (...args: any) => Promise<any>;

		get: (...args: any) => Promise<any>;

		getAll: (...args: any) => Promise<any>;

		list: (...args: any) => Promise<any>;

		del: (...args: any) => Promise<any>;

		delByProjectId: (...args: any) => Promise<any>;

		delByInterfaceId: (...args: any) => Promise<any>;

		delByCol: (...args: any) => Promise<any>;

		up: (...args: any) => Promise<any>;

		upCaseIndex: (...args: any) => Promise<any>;
	};
	interface: {
		constructor: (...args: any) => Promise<any>;

		getName: (...args: any) => Promise<any>;

		getSchema: (...args: any) => Promise<any>;

		save: (...args: any) => Promise<any>;

		get: (...args: any) => Promise<any>;

		getByIds: (...args: any) => Promise<any>;

		getBaseinfo: (...args: any) => Promise<any>;

		getVar: (...args: any) => Promise<any>;

		getByQueryPath: (...args: any) => Promise<any>;

		getByPath: (...args: any) => Promise<any>;

		count: (...args: any) => Promise<any>;

		countByProjectId: (...args: any) => Promise<any>;

		list: (...args: any) => Promise<any>;

		listWithPage: (...args: any) => Promise<any>;

		listByPid: (...args: any) => Promise<any>;

		/*获取全部接口信息
		 */
		getInterfaceListCount: (...args: any) => Promise<any>;

		listByCatid: (...args: any) => Promise<any>;

		listByCatidWithPage: (...args: any) => Promise<any>;

		listByOptionWithPage: (...args: any) => Promise<any>;

		listByInterStatus: (...args: any) => Promise<any>;

		del: (...args: any) => Promise<any>;

		delByCatid: (...args: any) => Promise<any>;

		delByProjectId: (...args: any) => Promise<any>;

		up: (...args: any) => Promise<any>;

		upEditUid: (...args: any) => Promise<any>;

		getcustomFieldValue: (...args: any) => Promise<any>;

		listCount: (...args: any) => Promise<any>;

		upIndex: (...args: any) => Promise<any>;

		search: (...args: any) => Promise<any>;
	};
	I18n: {
		getName: (...args: any) => Promise<any>;

		getSchema: (...args: any) => Promise<any>;

		deleteMany: (...args: any) => Promise<any>;

		save: (...args: any) => Promise<any>;

		up: (...args: any) => Promise<any>;

		list: (...args: any) => Promise<any>;

		keyValue: (...args: any) => Promise<any>;

		detail: (...args: any) => Promise<any>;

		detailByKey: (...args: any) => Promise<any>;

		insertMany: (...args: any) => Promise<any>;
	};
	group: {
		getName: (...args: any) => Promise<any>;

		getSchema: (...args: any) => Promise<any>;

		save: (...args: any) => Promise<any>;

		get: (...args: any) => Promise<any>;

		updateMember: (...args: any) => Promise<any>;

		getByPrivateUid: (...args: any) => Promise<any>;

		getGroupById: (...args: any) => Promise<any>;

		count: (...args: any) => Promise<any>;

		/*  分组数量统计
		 */
		getGroupListCount: (...args: any) => Promise<any>;

		addMember: (...args: any) => Promise<any>;

		delMember: (...args: any) => Promise<any>;

		changeMemberRole: (...args: any) => Promise<any>;

		checkMemberRepeat: (...args: any) => Promise<any>;

		list: (...args: any) => Promise<any>;

		/**
	 *
	 * 当前用户uid 作为创建者，或者成员
	 *
	 * @param {any} uid
	 * @returns
	 *
	 * @memberOf ModelGroup
	 
*/
		getAuthList: (...args: any) => Promise<any>;

		findByGroups: (...args: any) => Promise<any>;

		del: (...args: any) => Promise<any>;

		up: (...args: any) => Promise<any>;

		getcustomFieldName: (...args: any) => Promise<any>;

		search: (...args: any) => Promise<any>;
	};
	follow: {
		getName: (...args: any) => Promise<any>;

		getSchema: (...args: any) => Promise<any>;

		/**
	 * @param {Number} uid 用户id
	 * @param {Number} projectid 项目id
	 * @param {String} projectname 项目名
	 * @param {String} icon 项目图标
	 
*/
		save: (...args: any) => Promise<any>;

		del: (...args: any) => Promise<any>;

		delByProjectId: (...args: any) => Promise<any>;

		list: (...args: any) => Promise<any>;

		listByProjectId: (...args: any) => Promise<any>;

		checkProjectRepeat: (...args: any) => Promise<any>;

		updateById: (...args: any) => Promise<any>;
	};

	avatar: {
		getName: (...args: any) => Promise<any>;

		getSchema: (...args: any) => Promise<any>;

		getBy: (...args: any) => Promise<any>;

		get: (...args: any) => Promise<any>;

		upsert: (...args: any) => Promise<any>;
	};
	Audio: {
		getName: (...args: any) => Promise<any>;

		getSchema: (...args: any) => Promise<any>;

		getByMd5: (...args: any) => Promise<any>;

		save: (...args: any) => Promise<any>;
	};
};
