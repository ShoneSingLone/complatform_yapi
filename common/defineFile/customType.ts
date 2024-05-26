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
		getName: () => Promise<any>;

		getSchema: () => Promise<any>;

		/**
	 * @description 保存
	 *
	 * @param {any} data
	 * @returns
	 *
	 * @memberOf ModelWikiOrder
	 
*/

		save: (data: any) => Promise<any>;

		detail: () => Promise<any>;

		upsertOne: () => Promise<any>;

		delete: (_id: string) => Promise<any>;

		up: (_id: any, data: any) => Promise<any>;
	};
	wiki: {
		getName: () => Promise<any>;

		getSchema: () => Promise<any>;

		save: () => Promise<any>;

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

		detail: () => Promise<any>;

		/* find  find  find  find  find  find  find  find  find  find  find
		 */
		delete: () => Promise<any>;

		up: () => Promise<any>;
	};
	VerifyCode: {
		getName: () => Promise<any>;

		getSchema: () => Promise<any>;

		upsertOne: () => Promise<any>;

		findByEmail: () => Promise<any>;

		del: () => Promise<any>;
	};
	user: {
		getName: () => Promise<any>;

		getSchema: () => Promise<any>;

		save: () => Promise<any>;

		count: () => Promise<any>;

		list: () => Promise<any>;

		findByUids: () => Promise<any>;

		listWithPaging: () => Promise<any>;

		listCount: () => Promise<any>;

		findByEmail: () => Promise<any>;

		findById: () => Promise<any>;

		del: () => Promise<any>;

		/**
	 * @description
	 *
	 * @param {any} id
	 * @param {any} data
	 * @returns
	 *
	 * @memberOf ModelUser
	 
*/
		update: () => Promise<any>;

		search: () => Promise<any>;
	};
	token: {
		getName: () => Promise<any>;

		getSchema: () => Promise<any>;

		save: () => Promise<any>;

		get: () => Promise<any>;

		findId: () => Promise<any>;

		up: () => Promise<any>;
	};
	storage: {
		getName: () => Promise<any>;

		getSchema: () => Promise<any>;

		save: () => Promise<any>;

		del: () => Promise<any>;

		get: () => Promise<any>;
	};
	ResourceChunk: {
		getName: () => Promise<any>;

		getSchema: () => Promise<any>;

		save: (data: any) => Promise<any>;

		delChunksByFileHash: () => Promise<any>;

		/**
	 * 根据md5查询分片信息
	 * @param {any} md5
	 * @returns
	 
*/

		findByMd5: (md5: string) => Promise<any>;
	};
	Resource: {
		getName: () => Promise<any>;

		getSchema: () => Promise<any>;

		save: (data: object) => Promise<any>;

		update: () => Promise<any>;

		updateOneByMd5: (...args: any) => Promise<any>;

		getResourceById: () => Promise<any>;

		getResourceByName: () => Promise<any>;

		findByMd5: () => Promise<any>;

		findAll: () => Promise<any>;

		/**
	 * @description
	 *
	 * @param {any} condition
	 * @returns
	 *
	 * @memberOf ModelResource
	 
*/

		search: (condition: object, orderBy?: object) => Promise<any>;
	};
	project: {
		getName: () => Promise<any>;

		constructor: () => Promise<any>;

		getAuthList: () => Promise<any>;

		getSchema: () => Promise<any>;

		updateMember: () => Promise<any>;

		save: () => Promise<any>;

		handleEnvNullData: () => Promise<any>;

		get: () => Promise<any>;

		getByEnv: () => Promise<any>;

		getProjectWithAuth: () => Promise<any>;

		getBaseInfo: () => Promise<any>;

		getByDomain: () => Promise<any>;

		checkNameRepeat: () => Promise<any>;

		checkDomainRepeat: () => Promise<any>;

		list: () => Promise<any>;

		/* 获取项目数量统计
		 */
		getProjectListCount: () => Promise<any>;

		countWithPublic: () => Promise<any>;

		listWithPaging: () => Promise<any>;

		listCount: () => Promise<any>;

		countByGroupId: () => Promise<any>;

		del: () => Promise<any>;

		delByGroupid: () => Promise<any>;

		up: () => Promise<any>;

		addMember: () => Promise<any>;

		delMember: () => Promise<any>;

		checkMemberRepeat: () => Promise<any>;

		changeMemberRole: () => Promise<any>;

		changeMemberEmailNotice: () => Promise<any>;

		search: () => Promise<any>;
	};
	log: {
		getName: () => Promise<any>;

		getSchema: () => Promise<any>;

		/**
	 * @param {String} content log内容
	 * @param {Enum} type log类型， ['user', 'group', 'interface', 'project', 'other']
	 * @param {Number} uid 用户id
	 * @param {String} username 用户名
	 * @param {Number} typeid 类型id
	 * @param {Number} add_time 时间
	 
*/
		save: () => Promise<any>;

		del: () => Promise<any>;

		list: () => Promise<any>;

		listWithPaging: () => Promise<any>;

		listWithPagingByGroup: () => Promise<any>;

		listCountByGroup: () => Promise<any>;

		listCount: () => Promise<any>;

		listWithCatid: () => Promise<any>;
	};
	interfaceCol: {
		getName: () => Promise<any>;

		getSchema: () => Promise<any>;

		save: () => Promise<any>;

		get: () => Promise<any>;

		count: () => Promise<any>;

		list: () => Promise<any>;

		del: () => Promise<any>;

		delByProjectId: () => Promise<any>;

		up: () => Promise<any>;

		upColIndex: () => Promise<any>;
	};
	interfaceCategory: {
		getName: () => Promise<any>;

		getSchema: () => Promise<any>;

		save: () => Promise<any>;

		get: () => Promise<any>;

		count: () => Promise<any>;

		list: () => Promise<any>;

		search: () => Promise<any>;

		del: () => Promise<any>;

		delByProjectId: () => Promise<any>;

		up: () => Promise<any>;

		upCatIndex: () => Promise<any>;
	};
	interfaceCase: {
		getName: () => Promise<any>;

		getSchema: () => Promise<any>;

		save: () => Promise<any>;

		/*获取全部测试接口信息
		 */
		getInterfaceCaseListCount: () => Promise<any>;

		get: () => Promise<any>;

		getAll: () => Promise<any>;

		list: () => Promise<any>;

		del: () => Promise<any>;

		delByProjectId: () => Promise<any>;

		delByInterfaceId: () => Promise<any>;

		delByCol: () => Promise<any>;

		up: () => Promise<any>;

		upCaseIndex: () => Promise<any>;
	};
	interface: {
		constructor: () => Promise<any>;

		getName: () => Promise<any>;

		getSchema: () => Promise<any>;

		save: () => Promise<any>;

		get: () => Promise<any>;

		getBaseinfo: () => Promise<any>;

		getVar: () => Promise<any>;

		getByQueryPath: () => Promise<any>;

		getByPath: () => Promise<any>;

		count: () => Promise<any>;

		countByProjectId: () => Promise<any>;

		list: () => Promise<any>;

		listWithPage: () => Promise<any>;

		listByPid: () => Promise<any>;

		/*获取全部接口信息
		 */
		getInterfaceListCount: () => Promise<any>;

		listByCatid: () => Promise<any>;

		listByCatidWithPage: () => Promise<any>;

		listByOptionWithPage: () => Promise<any>;

		listByInterStatus: () => Promise<any>;

		del: () => Promise<any>;

		delByCatid: () => Promise<any>;

		delByProjectId: () => Promise<any>;

		up: () => Promise<any>;

		upEditUid: () => Promise<any>;

		getcustomFieldValue: () => Promise<any>;

		listCount: () => Promise<any>;

		upIndex: () => Promise<any>;

		search: () => Promise<any>;
	};
	I18n: {
		getName: () => Promise<any>;

		getSchema: () => Promise<any>;

		deleteMany: () => Promise<any>;

		save: () => Promise<any>;

		up: () => Promise<any>;

		list: () => Promise<any>;

		keyValue: () => Promise<any>;

		detail: () => Promise<any>;

		detailByKey: () => Promise<any>;

		insertMany: () => Promise<any>;
	};
	group: {
		getName: () => Promise<any>;

		getSchema: () => Promise<any>;

		save: () => Promise<any>;

		get: () => Promise<any>;

		updateMember: () => Promise<any>;

		getByPrivateUid: () => Promise<any>;

		getGroupById: () => Promise<any>;

		count: () => Promise<any>;

		/*  分组数量统计
		 */
		getGroupListCount: () => Promise<any>;

		addMember: () => Promise<any>;

		delMember: () => Promise<any>;

		changeMemberRole: () => Promise<any>;

		checkMemberRepeat: () => Promise<any>;

		list: () => Promise<any>;

		/**
	 *
	 * 当前用户uid 作为创建者，或者成员
	 *
	 * @param {any} uid
	 * @returns
	 *
	 * @memberOf ModelGroup
	 
*/
		getAuthList: () => Promise<any>;

		findByGroups: () => Promise<any>;

		del: () => Promise<any>;

		up: () => Promise<any>;

		getcustomFieldName: () => Promise<any>;

		search: () => Promise<any>;
	};
	follow: {
		getName: () => Promise<any>;

		getSchema: () => Promise<any>;

		/**
	 * @param {Number} uid 用户id
	 * @param {Number} projectid 项目id
	 * @param {String} projectname 项目名
	 * @param {String} icon 项目图标
	 
*/
		save: () => Promise<any>;

		del: () => Promise<any>;

		delByProjectId: () => Promise<any>;

		list: () => Promise<any>;

		listByProjectId: () => Promise<any>;

		checkProjectRepeat: () => Promise<any>;

		updateById: () => Promise<any>;
	};

	avatar: {
		getName: () => Promise<any>;

		getSchema: () => Promise<any>;

		getBy: () => Promise<any>;

		get: () => Promise<any>;

		upsert: () => Promise<any>;
	};
};
