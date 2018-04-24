package com.bynn.diy.bridge;

import android.graphics.Color;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewProps;
import com.facebook.react.uimanager.annotations.ReactProp;

import jp.wasabeef.richeditor.RichEditor;

/**
 * Created by barry on 2018/4/17.
 */

public class RichEditorManager extends SimpleViewManager<RichEditor> {

    public static final String NATIVE_VIEW = "RichEditorView";

    public RichEditor mEditor;

    @Override
    public String getName() {
        return NATIVE_VIEW;
    }

    @Override
    protected RichEditor createViewInstance(ThemedReactContext reactContext) {

        mEditor = new RichEditor(reactContext);
        mEditor.setEditorHeight(200);
        mEditor.setEditorFontSize(22);
        mEditor.setEditorFontColor(Color.parseColor("#666666"));
//        mEditor.setEditorBackgroundColor(Color.BLUE);
//        mEditor.setBackgroundColor(Color.WHITE);
        //mEditor.setBackgroundResource(R.drawable.bg);
        mEditor.setPadding(10, 10, 10, 10);
        //mEditor.setBackground("https://raw.githubusercontent.com/wasabeef/art/master/chip.jpg");
        mEditor.setPlaceholder("请输入正文");
        mEditor.setInputEnabled(true);
        mEditor.focusEditor();

        mEditor.setOnTextChangeListener(new RichEditor.OnTextChangeListener() {
            @Override public void onTextChange(String text) {

            }
        });
        return mEditor;
    }

    /**
     * 背景颜色
     * @param editor
     * @param backgroundColor
     */
    @ReactProp(name="backgroundColor", defaultInt = 0x000000)
    public void setEditorBackgroundColor(RichEditor editor, Integer backgroundColor) {
        editor.setEditorBackgroundColor(backgroundColor);
    }

    /**
     * 背景图片
     * @param editor
     * @param url
     */
    @ReactProp(name="backgroundUrl")
    public void setBackground(RichEditor editor, String url) {
        editor.setBackground(url);
    }

    /**
     * 高度
     * @param editor
     * @param height
     */
    @ReactProp(name="editorHeight", defaultInt = 200)
    public void setEditorHeight(RichEditor editor, Integer height) {
        editor.setEditorHeight(height);
    }

    /**
     * 文字大小
     * @param editor
     * @param fontSize
     */
    @ReactProp(name="editorFontSize")
    public void setEditorFontSize(RichEditor editor, Integer fontSize) {
        editor.setEditorFontSize(fontSize);
    }

    /**
     * 文字颜色
     * @param editor
     * @param fontColor
     */
    @ReactProp(name="editorFontColor")
    public void setEditorFontColor(RichEditor editor, Integer fontColor) {
        editor.setEditorFontColor(fontColor);
    }

    /**
     * 设置提示
     * @param editor
     * @param placeHolder
     */
    @ReactProp(name="placeHolder")
    public void setEditorPlaceholder(RichEditor editor, String placeHolder) {
        editor.setPlaceholder(placeHolder);
    }

    /**
     * 是否能编辑
     * @param editor
     * @param inputEnabled
     */
    @ReactProp(name="inputEnabled", defaultBoolean = true)
    public void setInputEnabled(RichEditor editor, boolean inputEnabled) {
        editor.setInputEnabled(inputEnabled);
    }

    /**
     * 设置内边距
     * @param editor
     * @param padding
     */
    @ReactProp(name=ViewProps.RESIZE_MODE)
    public void setPadding(RichEditor editor, ReadableMap padding) {
        int left = padding.getInt("left");
        int top = padding.getInt("top");
        int right = padding.getInt("right");
        int bottom = padding.getInt("bottom");

        editor.setPadding(left, top, right, bottom);
    }


}
