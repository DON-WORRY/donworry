import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosWithAuth, axiosWithoutAuth } from '../axios/http';

// 계좌 이체
export function transfer() {
    axiosWithAuth.post("/api/transfer")
}