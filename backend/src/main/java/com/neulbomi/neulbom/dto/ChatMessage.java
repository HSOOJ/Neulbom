package com.neulbomi.neulbom.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {

    public ChatMessage() {
    }

    @Builder
    public ChatMessage(MessageType type, String roomId, int senderSeq, String message) {
        this.type = type;
        this.roomId = roomId;
        this.senderSeq = senderSeq;
        this.message = message;
    }

    // 메시지 타입 : 입장, 퇴장, 채팅
    public enum MessageType {
        ENTER, QUIT, TALK
    }

    private MessageType type; // 메시지 타입
    private String roomId; // 방번호
    private int senderSeq; // 메시지 보낸사람
    private String message; // 메시지
}