import {addHotelAPI, addRoomAPI,deleteHotelAPI} from '@/api/hotelManager'
import {getAllOrdersAPI,cancelOrderAPI} from '@/api/order'
import {hotelAllCouponsAPI, hotelTargetMoneyAPI,} from '@/api/coupon'
import {message} from 'ant-design-vue'

const hotelManager = {
    state: {
        orderList: [],
        addHotelParams: {
            name: '',
            address: '',
            bizRegion:'XiDan',
            hotelStar:'',
            rate: 0,
            description:'',
            phoneNum:'',
            managerId:'',
        },
        addHotelModalVisible: false,
        addRoomParams: {
            roomType: '',
            hotelId: '',
            price: '',
            total: 0,
            curNum: 0,
        },
        addRoomModalVisible: false,
        couponVisible: false,
        addCouponVisible: false,
        activeHotelId: 0,
        couponList: [],
    },
    mutations: {
        set_orderList: function(state, data) {
            state.orderList = data
        },
        set_addHotelModalVisible: function(state, data) {
            state.addHotelModalVisible = data
        },
        set_addHotelParams: function(state, data) {
            state.addHotelParams = {
                ...state.addHotelParams,
                ...data,
            }
        },
        set_addRoomModalVisible: function(state, data) {
            state.addRoomModalVisible = data
        },
        set_addRoomParams: function(state, data) {
            state.addRoomParams = {
                ...state.addRoomParams,
                ...data,
            }
        },
        set_couponVisible: function(state, data) {
            state.couponVisible = data
        },
        set_activeHotelId: function(state, data) {
            state.activeHotelId = data
        },
        set_couponList: function(state, data) {
            state.couponList = data
        },
        set_addCouponVisible: function(state, data) {
            state.addCouponVisible =data
        }
    },
    actions: {
        getAllOrders: async({ state, commit }) => {
            const res = await getAllOrdersAPI()
            if(res){
                commit('set_orderList', res)
                //console.log(state.orderList[1])
            }
        },
        addHotel: async({ state, dispatch, commit }) => {
            const res = await addHotelAPI(state.addHotelParams)
            if(res){
                dispatch('getHotelList');
                commit('set_addHotelParams', {
                    name: '',
                    address: '',
                    bizRegion:'XiDan',
                    hotelStar:'',
                    rate: 0,
                    description:'',
                    phoneNum:'',
                    managerId:'',
                })
                commit('set_addHotelModalVisible', false)
                message.success('????????????')
            }else{
                message.error('????????????')
            }
        },
        addRoom: async({ state, dispatch, commit }) => {
            const res = await addRoomAPI(state.addRoomParams)
            //console.log(res)
            if(res){
                commit('set_addRoomModalVisible', false)
                commit('set_addRoomParams', {
                    roomType: '',
                    hotelId: '',
                    price: '',
                    total: 0,
                    curNum: 0,
                })
                message.success('????????????')
            }else{
                message.error('????????????')
            }
        },
        getHotelCoupon: async({ state, commit }) => {
            const res = await hotelAllCouponsAPI(state.activeHotelId)
            if(res) {
                // ?????????????????????????????????????????????????????????????????????couponList???
                commit('set_couponList',res);
            }
        },
        addHotelCoupon: async({state,dispatch ,commit}, data) => {

            const res = await hotelTargetMoneyAPI(data)
            if(res){
                // ??????????????????????????????????????????modal???????????????????????????????????????????????????
                dispatch('getHotelCoupon')
                commit('set_addCouponVisible', false)
                commit('set_couponVisible',true)
                message.success('??????????????????')
            }else{
                // ????????????????????????
                message.error('????????????');
            }
        },
        /* deleteHotelById:async({state,commit})=>{
             const res = await deleteHotelAPI(state.activeHotelId)
             //console.log(state.activeHotelId)
             if(res){
                 //????????????
                 location.reload();
                 message.success('????????????')
             }else{
                 message.error("????????????")
             }
         },
         deleteOrderById:async({state,commit},id)=>{
             const res = await cancelOrderAPI(id)
             //console.log(state.activeHotelId)
             if(res){
                //????????????
                location.reload();
                message.success('????????????')
             }else{
                 message.error('????????????')
             }
         }*/
    }
};
export default hotelManager