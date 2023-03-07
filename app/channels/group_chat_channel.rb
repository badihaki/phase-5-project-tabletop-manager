class GroupChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    # stop_all_streams
    user = params['username']
    # stream_for 'public_chat'
    stream_from 'public_chat'
    # debugger
    ActionCable.server.broadcast 'public_chat', "#{user} has logged in and joined the session"
  end

  def receive(data)
    # debugger
    ActionCable.server.broadcast 'public_chat', data
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    # ActionCable.server.broadcast 'public_chat', "#{user} has left the channel"
    # stop_all_streams
  end

end
