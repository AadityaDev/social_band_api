package com.aditya.ipresolver.ipreader.pojo;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Repository;

@Repository
public class IPAddress {
    
    private Map<String, Integer> ipAddressStore = new ConcurrentHashMap<String, Integer>();

    public Map<String, Integer> getIPAddresses() {
        return ipAddressStore;
    }

    public void saveIPAddress(String key) {
        int val = 0;
        if(ipAddressStore.containsKey(key)) {
            val = ipAddressStore.get(key);
        }
        val +=1;
        ipAddressStore.put(key, val);
    }

    public void clear() {
        if(ipAddressStore==null||ipAddressStore.isEmpty()) {
            return;
        }
        ipAddressStore.clear();
    }

    

}
